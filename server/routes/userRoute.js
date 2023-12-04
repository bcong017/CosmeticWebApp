const express = require('express');
const {userLogin , userRegister} = require('../controllers/userController');
const route = express.Router();

route.post('/login', userLogin);
route.post('/register', userRegister);

module.exports = route;