// routes/adminRoutes.js
const express = require('express');
const route = express.Router();
const { adminDeactivateUser } = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');

// Apply the authenticateAdmin middleware to the admin deactivation route
route.post('/deactivate/:userId', authenticateAdmin, adminDeactivateUser);

module.exports = route;
