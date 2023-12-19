const express = require('express');
const route = express.Router();
const { searchItems } = require('../controllers/searchController');

route.post('/search', searchItems);

module.exports = route;
