const express = require('express');
const { importData } = require('../controllers/importDataController');
const router = express.Router();

router.post('/import', importData);

module.exports = router;
