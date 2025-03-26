const express = require('express');
const { signup, login, getUserProfile } = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authMiddleware, getUserProfile); // ✅ Assure-toi que cette ligne existe

module.exports = router;
