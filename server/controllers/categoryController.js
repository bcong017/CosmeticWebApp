// controllers/categoryController.js
const db = require("../models");

const getItemsByCategory = async (req, res) => {
  try {
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
        brand: item.brand.replace('Thương Hiệu', '').trim(),
        first_image_url: firstImageUrl,
        user_rating: item.user_rating,
      };
    });

    return res.status(202).json({
      resultedItems
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { getItemsByCategory };
