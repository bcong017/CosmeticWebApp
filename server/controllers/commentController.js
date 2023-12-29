// controllers/commentController.js
const db = require("../models");
const jwt = require("jsonwebtoken");

const getCommentsForItem = async (itemId) => {
  try {
    const comments = await db.Comment.findAll({
      where: { item_id: itemId },
      include: [
        {
          model: db.User,
          attributes: ["id", "username", "name"],
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
    console.error("Error in getCommentsForItem:", error);
    throw error; // Propagate the error to the caller
  }
};

const addCommentToItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { commentText } = req.body;

    const token = req.headers.authorization;

    if (!token) {
      // If there is no token, return unauthorized
      return res
        .status(401)
        .json({ error: "Unauthorized. Please log in to comment." });
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

    // Check if the user is logged in
    const user = req.user;

    const userId = user.userId;

    // Create the comment in the database with the formatted comment date
    const comment = await db.Comment.create({
      item_id: itemId,
      user_id: userId,
      comment_text: commentText,
      comment_date: new Date().toLocaleString("en-US", { timeZone: "UTC" }), // Format the comment date
      // Add other comment properties as needed
    });

    // Return only the newly added comment
    return res.status(201).json({ newComment: comment });
  } catch (error) {
    console.error("Error in addCommentToItem:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized. Please log in to comment." });
    }

    try {
      const tokenParts = token.split(" ", 2);

      if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        throw new Error("Invalid token format");
      }

      const decoded = jwt.verify(tokenParts[1], "UserSecretKey");
      req.user = decoded;
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ error: "Unauthorized. Invalid token format." });
    }

    const user = req.user;
    const comment = await db.Comment.findByPk(commentId, {
      include: [
        {
          model: db.User,
          attributes: ["id", "username", "name"],
        },
      ],
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    if (!comment.User || comment.User.id !== user.userId) {
      return res.status(403).json({
        error: "Forbidden. You do not have permission to delete this comment.",
      });
    }

    // Copy the comment before deleting
    const deletedComment = { ...comment.toJSON() };

    // Return the deleted comment in the response
    res.status(200).json({ deletedComment });

    // Delete the comment
    await db.Comment.destroy({
      where: { id: commentId },
    });
  } catch (error) {
    console.error("Error in deleteComment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const editComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { commentText } = req.body;

    const token = req.headers.authorization;

    if (!token) {
      // If there is no token, return unauthorized
      return res
        .status(401)
        .json({ error: "Unauthorized. Please log in to comment." });
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

    const user = req.user;

    // Check if the comment exists
    const comment = await db.Comment.findByPk(commentId, {
      include: [
        {
          model: db.User,
          attributes: ["id", "username", "name"],
        },
      ],
    });

    // Check if the logged-in user is the author of the comment
    if (!comment.User || comment.User.id !== user.userId) {
      return res.status(403).json({
        error: "Forbidden. You do not have permission to delete this comment.",
      });
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
    return res.status(200).json({
      message: "The comment has been edited as follows:",
      updatedComment,
    });
  } catch (error) {
    console.error("Error in editComment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCommentsForItem,
  addCommentToItem,
  deleteComment,
  editComment,
};
