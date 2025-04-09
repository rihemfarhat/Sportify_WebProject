const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getCoachById,
  getCoachProfile
} = require('../controllers/coach');

const authMiddleware = require('../middleware/authMiddleware');

// Route pour s'inscrire
router.post('/signup', signup);

// Route pour se connecter
router.post('/login', login);

// Route pour obtenir un coach par son ID
router.get('/:id', getCoachById);

// Route pour obtenir le profil du coach, nécessite l'authentification
router.get('/coach-profile', authMiddleware('coach'), getCoachProfile);

module.exports = router;
