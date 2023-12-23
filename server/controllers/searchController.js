const db = require("../models");

const searchItems = async (req, res) => {
  try {
    const { searchTerm, order } = req.query;

    const selectedAttributes = ['id','name', 'price', 'brand', 'image_urls', 'user_rating'];

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const itemsPerPage = 10; // Adjust as needed

    const offset = (page - 1) * itemsPerPage;

    let orderBy = [['price', 'ASC']]; // Default order: Low to High

    if (order === 'HTL') {
      orderBy = [['price', 'DESC']]; // High to Low
    }

    const totalItems = await db.Item.count({
      where: {
        name: {
          [db.Sequelize.Op.like]: `%${searchTerm}%`, // Case-insensitive search
        },
      },
    });

    // Calculate totalPages
    const totalPages = totalItems <= itemsPerPage ? 1 : Math.ceil(totalItems / itemsPerPage);

    // Fetch the items for the current page with ordering
    const items = await db.Item.findAll({
      attributes: selectedAttributes,
      where: {
        name: {
          [db.Sequelize.Op.like]: `%${searchTerm}%`, // Case-insensitive search
        },
      },
      order: orderBy, // Apply ordering
      limit: itemsPerPage,
      offset: offset,
    });

    const resultedItems = items.map(item => {
      let finalPrice = item.price;

      if (item.sale_event_id && item.SaleEvent) {
        const currentDate = new Date();
        const startDate = new Date(item.SaleEvent.start_date);
        const endDate = new Date(item.SaleEvent.end_date);

        if (startDate <= currentDate && currentDate <= endDate) {
          // Calculate the discounted price
          const discountedPrice = (item.price * item.SaleEvent.discount_percentage) / 100;
          finalPrice = Math.max(0, item.price - discountedPrice);
        }
      }

      const imageUrlsArray = item.image_urls ? item.image_urls.split('***') : [];
      let firstImageUrl = imageUrlsArray[0];

      if (firstImageUrl && firstImageUrl.includes('promotions')) {
        firstImageUrl = imageUrlsArray[1] || null;
      }

      return {
        id: item.id,
        name: item.name,
        price: finalPrice, // Use the final price
        brand: item.brand,
        first_image_url: firstImageUrl,
        user_rating: item.user_rating,
      };
    });

    return res.status(200).json({
      resultedItems,
      currentPage: page,
      totalPages: Math.max(1, totalPages),
      totalItems
    });
  } catch (error) {
    console.error('Error searching items: ', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { searchItems };
