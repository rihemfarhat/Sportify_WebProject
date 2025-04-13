const express = require('express');
const router = express.Router();
const { getAllWomenProducts } = require('../controllers/womenController');

// Route GET /api/women
router.get('/', getAllWomenProducts);

module.exports = router;
