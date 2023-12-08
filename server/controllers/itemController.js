// controllers/itemController.js
const db = require("../models");

const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    console.log('Item ID:', itemId);

    // Retrieve the item along with its associated comments
    const item = await db.Item.findByPk(itemId, {
      include: [
        {
          model: db.Comment,
          attributes: ['id', 'comment_text', 'comment_date'],
          include: [
            {
              model: db.User,
              attributes: ['id', 'username', 'name'],
            },
          ],
        },
      ],
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Format the item data
    const imageUrlsArray = item.image_urls ? item.image_urls.split('***') : [];

    // Remove URLs containing "promotions"
    const filteredImageUrls = imageUrlsArray.filter(url => !url.includes("promotions"));

    // Use the modified first image URL
    const firstImageUrl = filteredImageUrls.length > 0 ? filteredImageUrls[0] : null;

    const formattedItem = {
      id: item.id,
      name: item.name,
      imageURLs: filteredImageUrls, // Include all image URLs without "promotions"
      price: item.price,
      brand: item.brand.replace('Thương Hiệu', '').trim(),
      category: item.category,
      ingredients: item.ingredients,
      quantity: item.quantity,
      product_information: item.product_information,
      use_information: item.use_information,
      specifications: item.specifications,
      is_on_sale: item.is_on_sale,
      sale_event_id: item.sale_event_id,
      user_rating: item.user_rating,
      rate_count: item.rate_count,
    };

    console.log('Formatted Item:', formattedItem);

    // Check if the item has comments
    if (item.Comments && item.Comments.length > 0) {
      // Format the comments data
      const formattedComments = item.Comments.map((comment) => ({
        id: comment.id,
        comment_text: comment.comment_text,
        comment_date: comment.comment_date,
        user: {
          id: comment.User.id,
          username: comment.User.username,
          name: comment.User.name,
        },
      }));

      console.log('Formatted Comments:', formattedComments);

      return res.status(200).json({
        item: formattedItem,
        comments: formattedComments,
      });
    } else {
      return res.status(200).json({
        item: formattedItem,
        comments: {},
      });
    }
  } catch (error) {
    console.error('Error in getItemById:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const addCommentToItem = async (req, res) => {
  try {
      const itemId = req.params.itemId;
      const { commentText } = req.body;

      // Check if the user is logged in
      const user = req.user;
      if (!user) {
          return res.status(401).json({ error: 'Unauthorized. Please log in to comment.' });
      }

      // Create the comment in the database with the formatted comment date
      const comment = await db.Comment.create({
          item_id: itemId,
          user_id: user.id,
          comment_text: commentText,
          comment_date: new Date().toLocaleString('en-US', { timeZone: 'UTC' }), // Format the comment date
          // Add other comment properties as needed
      });

      // Fetch updated comments for the item
      const itemComment = await getCommentsForItem(itemId, user);

      return res.status(201).json(itemComment);
  } catch (error) {
      console.error('Error in addCommentToItem:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* Comment pattern
{
  "commentText": "This is a test comment."
}
*/

module.exports = { getItemById , addCommentToItem};
