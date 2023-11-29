const express = require('express');
const {getItemsByCategory} = require('../controllers/categoryController');
const route = express.Router();

route.get('/:categoryName', getItemsByCategory);

module.exports = route;