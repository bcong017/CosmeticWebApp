const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const {getItemById, addCommentToItem} = require('../controllers/itemController');
const route = express.Router();

route.get('/:itemId', getItemById);
route.post('/post-comment/:itemId', authenticateUser, addCommentToItem);

module.exports = route;