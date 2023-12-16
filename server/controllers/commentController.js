// controllers/commentController.js
const db = require("../models");

const getCommentsForItem = async (itemId) => {
    try {
      const comments = await db.Comment.findAll({
        where: { item_id: itemId },
        include: [
          {
            model: db.User,
            attributes: ['id', 'username', 'name'],
          },
        ],
      });
  
      // Format the comments data
      const formattedComments = comments.map((comment) => ({
        id: comment.id,
        comment_text: comment.comment_text,
        comment_date: comment.comment_date,
        user: {
          id: comment.User.id,
          username: comment.User.username,
          name: comment.User.name,
        },
      }));
  
      return formattedComments;
    } catch (error) {
      console.error('Error in getCommentsForItem:', error);
      throw error; // Propagate the error to the caller
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
  
        const userId = user.userId;
  
        // Create the comment in the database with the formatted comment date
        const comment = await db.Comment.create({
            item_id: itemId,
            user_id: userId,
            comment_text: commentText,
            comment_date: new Date().toLocaleString('en-US', { timeZone: 'UTC' }), // Format the comment date
            // Add other comment properties as needed
        });
  
        // Return only the newly added comment
        return res.status(201).json({ newComment: comment });
    } catch (error) {
        console.error('Error in addCommentToItem:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
  const deleteComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;
  
      // Check if the user is logged in
      const user = req.user;
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized. Please log in to delete a comment.' });
      }
  
      // Check if the comment exists
      const comment = await db.Comment.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      // Check if the logged-in user is the author of the comment
      if (comment.user_id !== user.userId) {
        return res.status(403).json({ error: 'Forbidden. You do not have permission to delete this comment.' });
      }
  
      // Copy the comment before deleting
      const deletedComment = { ...comment.toJSON() };
  
      // Fetch updated comments for the item
      const itemId = comment.item_id;
      const itemComments = await getCommentsForItem(itemId);
  
      // Return the deleted comment in the response
      res.status(200).json({ deletedComment });
  
      // Delete the comment
      await db.Comment.destroy({
        where: { id: commentId },
      });
  
    } catch (error) {
      console.error('Error in deleteComment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const editComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const { commentText } = req.body;
  
      // Check if the user is logged in
      const user = req.user;
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized. Please log in to edit a comment.' });
      }
  
      // Check if the comment exists
      const comment = await db.Comment.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      // Check if the logged-in user is the author of the comment
      if (comment.user_id !== user.userId) {
        return res.status(403).json({ error: 'Forbidden. You do not have permission to edit this comment.' });
      }
  
      // Update the comment
      await db.Comment.update(
        { comment_text: commentText },
        {
          where: { id: commentId },
        }
      );
  
      // Fetch updated comments for the item
      const itemId = comment.item_id;
      const itemComments = await getCommentsForItem(itemId);
  
      // Get the updated comment
      const updatedComment = itemComments.find((c) => c.id === commentId);
  
      // Return the response with the updated comment text
      return res.status(200).json({ message: 'The comment has been edited as follows:', updatedComment });
    } catch (error) {
      console.error('Error in editComment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  /* Comment pattern
  {
    "commentText": "This is a test comment."
  }
  */

  
  module.exports = { getCommentsForItem, addCommentToItem, deleteComment, editComment };