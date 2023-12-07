// controllers/homeController.js
const db = require('../models');

const getTopItems = async (req, res) => {
  try {
    const topSoldItems = await db.Item.findAll({
      order: [['sold_count', 'DESC']],
      limit: 10,
      attributes: ['id', 'name', 'price', 'brand', 'sold_count', 'image_urls'],
    });

    const topRatedItems = await db.Item.findAll({
      order: [['user_rating', 'DESC']],
      limit: 10,
      attributes: ['id', 'name', 'price', 'brand', 'user_rating', 'image_urls'],
    });

    const formatItems = (items) => {
      return items.map(item => {
        const imageUrlsArray = item.image_urls ? item.image_urls.split('***') : [];
        let firstImageUrl = imageUrlsArray[0];

        // Check if the first image link contains "promotions", use the second link if true
        if (firstImageUrl && firstImageUrl.includes("promotions")) {
          firstImageUrl = imageUrlsArray[1] || null;
        }

        return {
          id: item.id,
          name: item.name,
          price: item.price,
          brand: item.brand,
          sold_count: item.sold_count,
          user_rating: item.user_rating,
          first_image_url: firstImageUrl,
        };
      });
    };

    const response = {
      topSoldItems: formatItems(topSoldItems),
      topRatedItems: formatItems(topRatedItems),
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching top items:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getTopItems };
