const { Op } = require('sequelize');
const { Item } = require('../models');

const searchItems = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    const selectedAttributes = ['name', 'price', 'brand', 'image_urls', 'user_rating'];

    const items = await Item.findAll({
      attributes: selectedAttributes,
      where: {
        name: {
          [Op.like]: `%${searchTerm}%`, // Case-insensitive search
        },
      },
    });

    const resultedItems = items.map(item => {
      const imageUrlsArray = item.image_urls ? item.image_urls.split('***') : [];
      let firstImageUrl = imageUrlsArray[0];

      if (firstImageUrl && firstImageUrl.includes('promotions')) {
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

    return res.status(200).json({
      resultedItems,
    });
  } catch (error) {
    console.error('Error searching items: ', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { searchItems };
