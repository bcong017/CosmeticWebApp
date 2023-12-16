const express = require('express');
const { getItemsByCategory, filterItemsByOptions } = require('../controllers/categoryController');
const route = express.Router();

// Get items by category
route.get('/:categoryName', getItemsByCategory);

// Filter items based on the provided filter options
route.get('/:categoryName/filter-items', filterItemsByOptions);

module.exports = route;
