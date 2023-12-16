const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const {getItemById, addCommentToItem, deleteComment, editComment} = require('../controllers/itemController');
const route = express.Router();

route.get('/:itemId', getItemById);
module.exports = route;