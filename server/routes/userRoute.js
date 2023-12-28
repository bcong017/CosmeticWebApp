const express = require('express');
const {userLogin , userRegister, selfDeactivateUser, createAdminAccount, getUserInfo, changePassword} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/auth');
const route = express.Router();

route.post('/login', userLogin);
route.post('/register', userRegister);
route.post('user/deactivate', authenticateUser, selfDeactivateUser )
route.post('/admin', createAdminAccount)
route.get('/user/info', getUserInfo)
route.post('/uer/change-password', changePassword)

module.exports = route;