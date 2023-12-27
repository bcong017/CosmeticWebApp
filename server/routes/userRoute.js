const express = require('express');
const {userLogin , userRegister, selfDeactivateUser, createAdminAccount} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/auth');
const route = express.Router();

route.post('/login', userLogin);
route.post('/register', userRegister);
route.post('/deactivate', authenticateUser, selfDeactivateUser )
route.post('/admin', createAdminAccount)

module.exports = route;