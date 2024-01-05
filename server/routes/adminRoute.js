// routes/adminRoutes.js
const express = require('express');
const route = express.Router();
const { adminDeactivateUser, confirmOrder, rejectOrder, addItem, editItem, deleteItem, getAllOrders, getAllUserAccounts, getItemsByCategory, getAllSaleEvents } = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');

// Apply the authenticateAdmin middleware to the admin deactivation route
route.post('/deactivate/:userId', authenticateAdmin, adminDeactivateUser);
route.post('/confirm/:orderId', authenticateAdmin, confirmOrder);
route.post('/reject/:orderId', authenticateAdmin, rejectOrder);
route.get('/order', authenticateAdmin, getAllOrders);
route.get('/user', authenticateAdmin, getAllUserAccounts);
route.get('/item/:categoryName', authenticateAdmin, getItemsByCategory);
route.get('/event', authenticateAdmin, getAllSaleEvents);
route.post('/item/create', authenticateAdmin, addItem);
route.put('/item/edit/:itemId', authenticateAdmin, editItem);
route.delete('/item/delete/:itemId', authenticateAdmin, deleteItem);

module.exports = route;
