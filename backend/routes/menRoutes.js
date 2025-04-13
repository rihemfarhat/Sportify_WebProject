const express = require('express');
const router = express.Router();
const { getAllmenProducts } = require('../controllers/menController');

router.get('/', getAllmenProducts);

module.exports = router;
