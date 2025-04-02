// routes/accessoireRoutes.js
const express = require('express');
const router = express.Router();
const accessoireController = require('../controllers/accessoireController');

// Get all accessories
router.get('/accessoires', accessoireController.getAllAccessoires);

// Add a new accessory
router.post('/accessoires', accessoireController.addAccessoire);

module.exports = router;
