const express = require('express');
const {userLogin , userRegister, selfDeactivateUser} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/auth');
const route = express.Router();

route.post('/login', userLogin);
route.post('/register', userRegister);
route.post('/deactivate', authenticateUser, selfDeactivateUser )

module.exports = route;