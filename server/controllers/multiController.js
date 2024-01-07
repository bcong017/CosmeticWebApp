// controllers/multiController.js
const db = require('../models');
const { Op } = require("sequelize");

const getAllBrands = async (req, res) => {
  try {
    // Find all distinct brands from the items
    const brands = await db.Item.findAll({
      attributes: [
        [db.sequelize.fn('DISTINCT', db.sequelize.col('brand')), 'brand'],
      ],
      where: {
        brand: {
          [db.Sequelize.Op.ne]: null, // Exclude null brands
        },
      },
    });

    // Extract the brand names from the result
    const brandNames = brands.map((brand) => brand.brand);

    return res.status(200).json({ brands: brandNames });
  } catch (error) {
    console.error('Error getting brands:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getDistinctCategories = async (req, res) => {
  try {
    // Fetch distinct categories from the database
    const distinctCategories = await db.Item.findAll({
      attributes: [
        [db.sequelize.fn('DISTINCT', db.sequelize.col('category')), 'category']
      ],
      where: {
        // Additional conditions if needed
      }
    });

    // Map the categories with custom names
    const mappedCategories = {};
    distinctCategories.forEach(category => {
      switch (category.category) {
        case "TayTrang":
          mappedCategories.TayTrang = "Tẩy Trắng";
          break;
        case "VungKin":
          mappedCategories.VungKin = "Nước hoa vùng kín";
          break;
        case "PhanNuoc":
          mappedCategories.PhanNuoc = "Phấn nước Cushion";
          break;
        case "DauXa":
          mappedCategories.DauXa = "Dầu xả";
          break;
        case "KemLot":
          mappedCategories.KemLot = "Kem lót";
          break;
        case "KemNen":
          mappedCategories.KemNen = "Kem nền";
          break;
        case "ToanThan":
          mappedCategories.ToanThan = "Nước hoa xịt toàn thân";
          break;
        default:
          mappedCategories[category.category] = category.category;
      }
    });

    return res.status(200).json(mappedCategories);
  } catch (error) {
    console.error("Error getting distinct categories:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

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
      "quantity"
    ];

    const { order } = req.query;

    // Default to 'LTH' if order is not specified
    const sortOrder = order === "HTL" ? "DESC" : "ASC";

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
        quantity: item.quantity
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

    return res.status(202).json({
      resultedItems,
    });
  } catch (error) {
    console.error("Error in getItemsByCategory:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllBrands, getDistinctCategories, getItemsByCategory };
