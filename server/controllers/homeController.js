// controllers/homeController.js
const db = require("../models");

const getTopItems = async (req, res) => {
  try {
    const topSoldItems = await db.Item.findAll({
      order: [["sold_count", "DESC"]],
      limit: 10,
      attributes: [
        "id",
        "name",
        "price",
        "brand",
        "sold_count",
        "image_urls",
        "sale_event_id",
      ],
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

    const topRatedItems = await db.Item.findAll({
      order: [["user_rating", "DESC"]],
      limit: 10,
      attributes: [
        "id",
        "name",
        "price",
        "brand",
        "sold_count",
        "image_urls",
        "sale_event_id",
      ],
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

    const formatItems = (items) => {
      return items.map((item) => {
        let finalPrice = item.price;

        if (item.sale_event_id && item.SaleEvent) {
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

        // Check if the first image link contains "promotions", use the second link if true
        if (firstImageUrl && firstImageUrl.includes("promotions")) {
          firstImageUrl = imageUrlsArray[1] || null;
        }

        const resultObject = {
          id: item.id,
          name: item.name,
          price: finalPrice, // Use the final price
          brand: item.brand,
          first_image_url: firstImageUrl,
          user_rating: item.user_rating,
        };

        // Include additional information if there is a sale event
        if (item.sale_event_id && item.SaleEvent) {
          resultObject.base_price = item.price;
          resultObject.discount_percentage = item.SaleEvent.discount_percentage;
          resultObject.end_date =
            item.SaleEvent.end_date.toLocaleDateString("en-GB");
        }

        return resultObject;
      });
    };

    const response = {
      topSoldItems: formatItems(topSoldItems),
      topRatedItems: formatItems(topRatedItems),
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching top items:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getTopItems };
