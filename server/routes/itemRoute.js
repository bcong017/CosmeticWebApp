const express = require('express');
const {getItemById} = require('../controllers/itemController');
const route = express.Router();

route.get('/:itemId', getItemById);
module.exports = route;