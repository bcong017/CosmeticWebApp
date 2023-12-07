// routes/homeRoutes.js
const express = require('express');
const { getTopItems } = require('../controllers/homeController');
const route = express.Router();

route.get('/',getTopItems);

module.exports = route;
