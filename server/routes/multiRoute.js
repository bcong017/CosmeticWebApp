const express = require('express');
const { getAllBrands, getDistinctCategories, getItemsByCategory } = require('../controllers/multiController');
const route = express.Router();

route.get('/all-brands', getAllBrands);
route.get('/all-categories', getDistinctCategories);
route.get('/categoryAll/:categoryName', getItemsByCategory)

module.exports = route;