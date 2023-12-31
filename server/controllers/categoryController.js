// controllers/categoryController.js
const db = require("../models");

const getItemsByCategory = async (req, res) => {
  try {
    const selectedAttributes = [
      "id",
      "name",
      "price",
      "brand",
      "image_urls",
      "user_rating",
      "is_on_sale",
    ];

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const itemsPerPage = 10; // Adjust as needed
    const offset = (page - 1) * itemsPerPage;

    const { order } = req.query;

    // Default to 'LTH' if order is not specified
    const sortOrder = order === "HTL" ? "DESC" : "ASC";

    // Count the total number of items
    const totalItems = await db.Item.count({
      where: {
        category: req.params.categoryName,
      },
      include: [
        {
          model: db.SaleEvent,
          attributes: ["discount_percentage", "start_date", "end_date"],
          where: {
            is_active: true,
          },
          required: false,
        },
      ],
    });

    // Calculate totalPages
    const totalPages =
      totalItems <= itemsPerPage ? 1 : Math.ceil(totalItems / itemsPerPage);

    // Fetch the items for the current page
    const items = await db.Item.findAll({
      attributes: selectedAttributes,
      where: {
        category: req.params.categoryName,
      },
      include: [
        {
          model: db.SaleEvent,
          attributes: ["discount_percentage", "start_date", "end_date"],
          where: {
            is_active: true,
          },
          required: false,
        },
      ],
      order: [["price", sortOrder]], // Order by original price
      limit: itemsPerPage,
      offset: offset,
    });

    const resultedItems = items.map((item) => {
      let finalPrice = item.price; // Default to item price
      
      if (item.is_on_sale) {
        const currentDate = new Date();
        const startDate = new Date(item.SaleEvent.start_date);
        const endDate = new Date(item.SaleEvent.end_date);

        if (startDate <= currentDate && currentDate <= endDate) {
          // Calculate the discounted price
          const discountedPrice =
            (item.price * item.SaleEvent.discount_percentage) / 100;
          finalPrice = Math.max(0, item.price - discountedPrice);
          finalPrice = finalPrice.toFixed(3);
        }
      }

      const imageUrlsArray = item.image_urls
        ? item.image_urls.split("***")
        : [];
      let firstImageUrl = imageUrlsArray[0];

      if (firstImageUrl && firstImageUrl.includes("promotions")) {
        firstImageUrl = imageUrlsArray[1] || null;
      }

      // Construct the result object based on the presence of a sale event
      const resultObject = {
        id: item.id,
        name: item.name,
        price: finalPrice, // Use the final price
        brand: item.brand,
        first_image_url: firstImageUrl,
        user_rating: item.user_rating,
      };

      // Include additional information if there is a sale event
      if (item.is_on_sale) {
        resultObject.base_price = item.price;
        resultObject.discount_percentage = item.SaleEvent.discount_percentage;
        resultObject.end_date =
          item.SaleEvent.end_date.toLocaleDateString("en-GB");
      }

      return resultObject;
    });

    const filterOptions = await db.Item.findAll({
      attributes: [
        [
          db.sequelize.fn(
            "CONCAT",
            db.sequelize.literal(
              'CASE WHEN brand LIKE "Thương Hiệu%" THEN TRIM(SUBSTRING(brand, 14)) ELSE TRIM(brand) END'
            )
          ),
          "brand",
        ],
        [db.sequelize.literal("MAX(specifications)"), "specifications"],
      ],
      where: {
        category: req.params.categoryName,
      },
      group: ["brand"],
    });

    const options = {
      brand: filterOptions.map((option) => option.brand),
      country: [],
      productionPlaces: [],
    };

    filterOptions.forEach((option) => {
      const brand = option.brand || "";
      const specs = option.specifications || "";

      const brandNameMatch = brand.match(/Thương Hiệu\s*([^$]+)/);
      const brandName = brandNameMatch
        ? brandNameMatch[1].replace(" AS brand", "").trim()
        : null;

      let country;
      let productionPlaces;

      try {
        const specsObj = JSON.parse(specs);
        country = specsObj.Country || null;
        productionPlaces = specsObj.ProductionPlaces || null;
      } catch (error) {
        console.error("Error parsing specifications:", error);
      }

      if (brandName && !options.brand.includes(brandName)) {
        options.brand.push(brandName);
      }

      if (country && !options.country.includes(country)) {
        options.country.push(country);
      }

      if (
        productionPlaces &&
        !options.productionPlaces.includes(productionPlaces)
      ) {
        options.productionPlaces.push(productionPlaces);
      }
    });

    return res.status(202).json({
      resultedItems,
      filterOptions: options,
      currentPage: page,
      totalPages,
      totalItems,
    });
  } catch (error) {
    console.error("Error in getItemsByCategory:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const filterItemsByOptions = async (req, res) => {
  try {
    const selectedAttributes = [
      "id",
      "name",
      "price",
      "brand",
      "image_urls",
      "user_rating",
      "specifications",
      "is_on_sale",
    ];

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const itemsPerPage = 10; // Adjust as needed

    const offset = (page - 1) * itemsPerPage;

    const { brand, minPrice, maxPrice, order, productionPlaces, country } =
      req.query;

    const whereClause = {
      category: req.params.categoryName,
    };

    if (brand && brand.length > 0) {
      whereClause.brand = {
        [db.Sequelize.Op.or]: brand.split(",").map((b) => ({
          [db.Sequelize.Op.like]: `%${b.trim()}%`,
        })),
      };
    }

    if (minPrice && maxPrice) {
      whereClause.price = {
        [db.Sequelize.Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)],
      };
    }

    // Parse specifications JSON string
    if (country && country.length > 0) {
      whereClause.specifications = {
        [db.Sequelize.Op.or]: country.split(",").map((c) => ({
          [db.Sequelize.Op.like]: `%${c.trim()}%`,
        })),
      };
    }

    if (productionPlaces && productionPlaces.length > 0) {
      whereClause.specifications = {
        [db.Sequelize.Op.or]: productionPlaces.split(",").map((p) => ({
          [db.Sequelize.Op.like]: `%${p.trim()}%`,
        })),
      };
    }

    let orderBy = [["price", "ASC"]]; // Default order: Low to High

    if (order === "HTL") {
      orderBy = [["price", "DESC"]]; // High to Low
    }

    const totalItems = await db.Item.count({
      where: whereClause,
      include: [
        {
          model: db.SaleEvent,
          attributes: ["discount_percentage", "start_date", "end_date"],
          where: {
            is_active: true,
          },
          required: false,
        },
      ],
    });

    // Calculate totalPages
    const totalPages =
      totalItems <= itemsPerPage ? 1 : Math.ceil(totalItems / itemsPerPage);

    // Fetch the items for the current page with ordering
    const items = await db.Item.findAll({
      attributes: selectedAttributes,
      where: whereClause,
      include: [
        {
          model: db.SaleEvent,
          attributes: ["discount_percentage", "start_date", "end_date"],
          where: {
            is_active: true,
          },
          required: false,
        },
      ],
      order: orderBy, // Apply ordering
      limit: itemsPerPage,
      offset: offset,
    });

    const resultedItems = items.map((item) => {
      let finalPrice = item.price; // Default to item price

      if (item.is_on_sale) {
        const currentDate = new Date();
        const startDate = new Date(item.SaleEvent.start_date);
        const endDate = new Date(item.SaleEvent.end_date);
    
        if (startDate <= currentDate && currentDate <= endDate) {
          // Calculate the discounted price
          const discountedPrice = (item.price * item.SaleEvent.discount_percentage) / 100;
          finalPrice = Math.max(0, item.price - discountedPrice);
          finalPrice = finalPrice.toFixed(3);
        }
      }

      const imageUrlsArray = item.image_urls
        ? item.image_urls.split("***")
        : [];
      let firstImageUrl = imageUrlsArray[0];

      if (firstImageUrl && firstImageUrl.includes("promotions")) {
        firstImageUrl = imageUrlsArray[1] || null;
      }

      // Construct the result object based on the presence of a sale event
      const resultObject = {
        id: item.id,
        name: item.name,
        price: finalPrice, // Use the final price
        brand: item.brand,
        first_image_url: firstImageUrl,
        user_rating: item.user_rating,
      };

      // Include additional information if there is a sale event
      if (item.is_on_sale) {
        resultObject.base_price = item.price;
        resultObject.discount_percentage = item.SaleEvent.discount_percentage;
        resultObject.end_date =
          item.SaleEvent.end_date.toLocaleDateString("en-GB");
      }

      return resultObject;
    });

    const filterOptions = await db.Item.findAll({
      attributes: [
        [
          db.sequelize.fn(
            "CONCAT",
            db.sequelize.literal(
              'CASE WHEN brand LIKE "Thương Hiệu%" THEN TRIM(SUBSTRING(brand, 14)) ELSE TRIM(brand) END'
            )
          ),
          "brand",
        ],
        [db.sequelize.literal("MAX(specifications)"), "specifications"],
      ],
      where: {
        category: req.params.categoryName,
      },
      group: ["brand"],
    });

    const options = {
      brand: filterOptions.map((option) => option.brand),
      country: [],
      productionPlaces: [],
    };

    filterOptions.forEach((option) => {
      const brand = option.brand || "";
      const specs = option.specifications || "{}";

      const brandNameMatch = brand.match(/Thương Hiệu\s*([^$]+)/);
      const brandName = brandNameMatch
        ? brandNameMatch[1].replace(" AS brand", "").trim()
        : null;

      // Parse the specifications JSON string
      const specifications = JSON.parse(specs);

      const country = specifications.Country || null;
      const productionPlaces = specifications.ProductionPlaces || null;

      if (brandName && !options.brand.includes(brandName)) {
        options.brand.push(brandName);
      }

      if (country && !options.country.includes(country)) {
        options.country.push(country);
      }

      if (
        productionPlaces &&
        !options.productionPlaces.includes(productionPlaces)
      ) {
        options.productionPlaces.push(productionPlaces);
      }
    });

    return res.status(202).json({
      resultedItems,
      filterOptions: options,
      currentPage: page,
      totalPages,
      totalItems,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { getItemsByCategory, filterItemsByOptions };
