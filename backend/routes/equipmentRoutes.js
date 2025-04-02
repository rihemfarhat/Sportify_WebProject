const express = require('express');
const equipmentController = require('../controllers/equipmentController');

const router = express.Router();

// Routes for equipment
router.get('/equipment', equipmentController.getAllEquipment);
router.post('/equipment', equipmentController.addEquipment);

module.exports = router;
