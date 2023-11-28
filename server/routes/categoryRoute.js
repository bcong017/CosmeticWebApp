const express = require('express');
const categoryController = require('../controllers/categoryController');
const { route } = require('../app');

const router = express.Router();

router.get("/category", categoryController.index);

module.exports = router;