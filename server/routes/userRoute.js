const express = require('express');
const {userLogin , userRegister, selfDeactivateUser, getUserInfo, changePassword, getUserOrders, updateUserInfo} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/auth');
const route = express.Router();

route.post('/login', userLogin);
route.post('/register', userRegister);
route.post('user/deactivate', authenticateUser, selfDeactivateUser )
route.get('/user/info', getUserInfo)
route.post('/user/change-password', changePassword)
route.get('/user/order', authenticateUser, getUserOrders)
route.post('/user/update', authenticateUser, updateUserInfo);

module.exports = route;