const express = require('express');
const { createSaleEvent, deleteSaleEvent, updateSaleEvent } = require('../controllers/saleEventController');
const route = express.Router();

route.post('/add', createSaleEvent);
route.delete('/delete/:eventId',  deleteSaleEvent);
route.put('/edit/:eventId',  updateSaleEvent);

module.exports = route;