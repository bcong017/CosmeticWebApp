const express = require('express');
const route = express.Router();
const { addItemToCart, mergeCarts, editCartItemQuantity, removeCartItem, getItemsInCart } = require('../controllers/cartController');
const { authenticateUser } = require('../middleware/auth'); // Import your authentication middleware

// Apply the authenticateUser middleware to the add item route
route.post('/add', authenticateUser, addItemToCart);

// Create a route for merging carts (call this when the user logs in)
route.post('/merge', authenticateUser, mergeCarts);

// Create a route for edit item quantity
route.put('/edit', authenticateUser, editCartItemQuantity);

// Create a route for remove item from cart
route.delete('/delete/:cartItemId', authenticateUser, removeCartItem);

route.get('/items', authenticateUser, getItemsInCart);

module.exports = route;
