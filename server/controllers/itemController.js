// controllers/itemController.js
const db = require("../models");
const jwt = require('jsonwebtoken');

const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    // Retrieve the item along with its associated comments
    const item = await db.Item.findByPk(itemId, {
      include: [
        {
          model: db.Comment,
          attributes: ["id", "comment_text", "comment_date"],
          include: [
            {
              model: db.User,
              attributes: ["id", "username", "name"],
            },
          ],
        },
        {
          model: db.SaleEvent,
          attributes: ["event_name", "discount_percentage", "start_date", "end_date"],
          where: {
            is_active: true,
          },
          required: false,
        },
      ],
    });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Format the item data
    const imageUrlsArray = item.image_urls ? item.image_urls.split("***") : [];
    const filteredImageUrls = imageUrlsArray.filter(
      (url) => !url.includes("promotions")
    );

    let finalPrice = item.price;
    let discountPercentage = 0;

    if (item.sale_event_id && item.SaleEvent) {
      const currentDate = new Date();
      const startDate = new Date(item.SaleEvent.start_date);
      const endDate = new Date(item.SaleEvent.end_date);

      if (startDate <= currentDate && currentDate <= endDate) {
        discountPercentage = item.SaleEvent.discount_percentage;
        const discountedPrice = (item.price * discountPercentage) / 100;
        finalPrice = Math.max(0, item.price - discountedPrice);
        finalPrice = finalPrice.toFixed(3);
      }
    }

    const formattedItem = {
      id: item.id,
      name: item.name,
      imageURLs: filteredImageUrls,
      price: finalPrice,
      brand: item.brand.replace("Thương Hiệu", "").trim(),
      category: item.category,
      ingredients: item.ingredients,
      quantity: item.quantity,
      product_information: item.product_information,
      use_information: item.use_information,
      specifications: JSON.parse(item.specifications || "{}"),
      is_on_sale: item.is_on_sale,
      user_rating: item.user_rating,
      rate_count: item.rate_count,
      sale_event: item.SaleEvent
        ? {
            event_name: item.SaleEvent.event_name,
            discount_percentage: `${discountPercentage}%`,
            start_date: item.SaleEvent.start_date.toLocaleDateString("en-GB"),
            end_date: item.SaleEvent.end_date.toLocaleDateString("en-GB"),
          }
        : null,
      base_price: item.price,
    };

    let formattedComments = [];

    let token = null;

    if (req.headers.authorization) {
      // Extract the token from the Authorization header
      token = req.headers.authorization;
    }

    if (token) {
      const tokenParts = token.split(" ", 2);

      try {
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
          throw new Error("Invalid token format");
        }

        const decoded = jwt.verify(tokenParts[1], "UserSecretKey");
        // Attach the decoded user information to the request object
        req.user = decoded;
      } catch (error) {
        // Handle token verification errors
        console.error("Token verification error:", error);
      }
    }

    if (req.user && req.user.userId) {
      // User is logged in
      const userId = req.user.userId;

      if (item.Comments && item.Comments.length > 0) {
        // Format the comments data
        formattedComments = item.Comments.map((comment) => ({
          id: comment.id,
          comment_text: comment.comment_text,
          comment_date: comment.comment_date,
          user: {
            id: comment.User.id,
            username: comment.User.username,
            name: comment.User.name,
          },
          isCurrentUserComment: userId === comment.User.id,
        }));
      }
    } else if (item.Comments && item.Comments.length > 0) {
      // User is not logged in but there are comments
      formattedComments = item.Comments.map((comment) => ({
        id: comment.id,
        comment_text: comment.comment_text,
        comment_date: comment.comment_date,
        user: {
          id: comment.User.id,
          username: comment.User.username,
          name: comment.User.name,
        },
      }));
    }

    return res.status(200).json({
      item: formattedItem,
      comments: formattedComments,
    });
  } catch (error) {
    console.error("Error in getItemById:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getItemById };
