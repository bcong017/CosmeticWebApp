// routes/adminRoutes.js
const express = require('express');
const route = express.Router();
const { adminDeactivateUser, confirmOrder, rejectOrder, addItem, editItem, deleteItem } = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');

// Apply the authenticateAdmin middleware to the admin deactivation route
route.post('/deactivate/:userId', authenticateAdmin, adminDeactivateUser);
route.post('/confirm/:orderId', authenticateAdmin, confirmOrder);
route.post('/reject/:orderId', authenticateAdmin, rejectOrder);
route.post('/add', authenticateAdmin, addItem);
route.put('edit/:itemId', authenticateAdmin, editItem);
route.delete('delete/:itemId', authenticateAdmin, deleteItem);

module.exports = route;
