const express = require('express');
const { getAllBrands, getDistinctCategories } = require('../controllers/multiController');
const route = express.Router();

route.get('/all-brands', getAllBrands);
route.get('/all-categories', getDistinctCategories);

module.exports = route;