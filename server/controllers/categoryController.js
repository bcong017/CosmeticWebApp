// controllers/categoryController.js
const db = require("../models");

const getItemsByCategory = async (req, res) => {
  try {
    // Get items by category
    const selectedAttributes = ['name', 'price', 'brand', 'image_urls', 'user_rating'];
    const items = await db.Item.findAll({
      attributes: selectedAttributes,
      where: {
        category: req.params.categoryName
      }
    });

    const resultedItems = items.map(item => {
      const imageUrlsArray = item.image_urls ? item.image_urls.split('***') : [];
      let firstImageUrl = imageUrlsArray[0];

      // Check if the first image link contains "promotions", use the second link if true
      if (firstImageUrl && firstImageUrl.includes("promotions")) {
        firstImageUrl = imageUrlsArray[1] || null;
      }

      return {
        name: item.name,
        price: item.price,
        brand: item.brand.replace('Thương Hiệu', '').replace(' AS brand', '').trim(),
        first_image_url: firstImageUrl,
        user_rating: item.user_rating,
      };
    });

    // Get filter options for the specified category
    const filterOptions = await db.Item.findAll({
      attributes: [
        [
          db.sequelize.fn('CONCAT', 
            db.sequelize.literal('CASE WHEN brand LIKE "Thương Hiệu%" THEN TRIM(SUBSTRING(brand, 14)) ELSE TRIM(brand) END'),
          ),
          'brand'
        ],
        [db.sequelize.literal("MAX(specifications)"), "specifications"],
      ],
      where: {
        category: req.params.categoryName,
      },
      group: ['brand'],
    });

    const options = {
      brand: filterOptions.map(option => option.brand),
      country: [],
      productionPlaces: [],
    };

    filterOptions.forEach(option => {
      
      const brand = option.brand || '';
      const specs = option.specifications || '';

      // Extract the brand name after "Thương Hiệu" and trim spaces, excluding "AS brand"
      const brandNameMatch = brand.match(/Thương Hiệu\s*([^$]+)/);
      const brandName = brandNameMatch ? brandNameMatch[1].replace(' AS brand', '').trim() : null;

      // Extract country information up to the first '\n'
      const countryMatch = specs.match(/Xuất xứ thương hiệu\s*([^$]+)/);
      const country = countryMatch ? countryMatch[1].split('\n')[0].trim() : null;

      // Extract production places information up to the first '\nLoại da'
      const productionPlacesMatch = specs.match(/Nơi sản xuất\s*([^$]+)\nLoại da/);
      const productionPlaces = productionPlacesMatch ? productionPlacesMatch[1].trim() : null;

      if (brandName && !options.brand.includes(brandName)) {
        options.brand.push(brandName);
      }

      // Add country and production places to the options if not already present
      if (country && !options.country.includes(country)) {
        options.country.push(country);
      }

      if (productionPlaces && !options.productionPlaces.includes(productionPlaces)) {
        options.productionPlaces.push(productionPlaces);
      }
    });

    return res.status(202).json({
      resultedItems,
      filterOptions: options,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const filterItemsByOptions = async (req, res) => {
  try {
    const selectedAttributes = ['name', 'price', 'brand', 'image_urls', 'user_rating', 'specifications'];
    const { brand, productionPlaces, country } = req.query;

    const whereClause = {
      category: req.params.categoryName,
    };

    // Apply additional filters based on query parameters
    if (brand) {
      whereClause.brand = { [db.Sequelize.Op.in]: brand.split(",") };
    }

    const items = await db.Item.findAll({
      attributes: selectedAttributes,
      where: whereClause,
    });

    const resultedItems = items.map(item => {
      // Extract additional information from specifications field
      const specifications = item.specifications.split('\n');

      // Map the specifications to key-value pairs for easier access
      const specInfo = specifications.reduce((acc, spec) => {
        const [key, value] = spec.split(/\s{2,}/);
        acc[key.trim()] = value.trim();
        return acc;
      }, {});

      // Include country and production places information in the response
      const formattedItem = {
        name: item.name,
        price: item.price,
        brand: item.brand.replace('Thương Hiệu', '').trim(),
        specifications: {
          ...specInfo,
          country: specInfo['Nơi sản xuất'] || null,
          productionPlaces: specInfo['Nơi sản xuất'] || null,
        },
        user_rating: item.user_rating,
      };

      return formattedItem;
    });

    // Get filter options for the specified category
    const filterOptions = await db.Item.findAll({
      attributes: [
        [
          db.sequelize.fn('CONCAT', 
            db.sequelize.literal('CASE WHEN brand LIKE "Thương Hiệu%" THEN TRIM(SUBSTRING(brand, 14)) ELSE TRIM(brand) END'),
            ' AS brand'
          ),
          'brand'
        ],
        [db.sequelize.literal("MAX(specifications)"), "specifications"],
      ],
      where: {
        category: req.params.categoryName,
      },
      group: ['brand'],
    });

    const options = {
      brand: filterOptions.map(option => option.brand),
      country: [],
      productionPlaces: [],
    };

    filterOptions.forEach(option => {
      const brand = option.brand || '';
      const specs = option.specifications || '';

      // Extract the brand name after "Thương Hiệu" and trim spaces, excluding "AS brand"
      const brandNameMatch = brand.match(/Thương Hiệu\s*([^$]+)/);
      const brandName = brandNameMatch ? brandNameMatch[1].replace(' AS brand', '').trim() : null;

      // Extract country information up to the first '\n'
      const countryMatch = specs.match(/Xuất xứ thương hiệu\s*([^$]+)/);
      const country = countryMatch ? countryMatch[1].split('\n')[0].trim() : null;

      // Extract production places information up to the first '\nLoại da'
      const productionPlacesMatch = specs.match(/Nơi sản xuất\s*([^$]+)\nLoại da/);
      const productionPlaces = productionPlacesMatch ? productionPlacesMatch[1].trim() : null;

      if (brandName && !options.brand.includes(brandName)) {
        options.brand.push(brandName);
      }

      // Add country and production places to the options if not already present
      if (country && !options.country.includes(country)) {
        options.country.push(country);
      }

      if (productionPlaces && !options.productionPlaces.includes(productionPlaces)) {
        options.productionPlaces.push(productionPlaces);
      }
    });

    // Remove duplicates and filter out null values
    options.country = [...new Set(options.country.filter(country => country !== null))];
    options.productionPlaces = [...new Set(options.productionPlaces.filter(place => place !== null))];

    return res.status(200).json({
      resultedItems,
      filterOptions: options,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};


module.exports = { getItemsByCategory, filterItemsByOptions };