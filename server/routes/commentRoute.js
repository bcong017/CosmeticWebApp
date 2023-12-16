const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const {addCommentToItem, deleteComment, editComment} = require('../controllers/commentController');
const route = express.Router();

route.post('/add/:itemId', authenticateUser, addCommentToItem);
route.delete('/delete/:commentId', authenticateUser, deleteComment);
route.put('/edit/:commentId', authenticateUser, editComment);
module.exports = route;