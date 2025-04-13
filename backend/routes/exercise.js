const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/multer'); // Ceci contient upload.single('video')

const {
  createExercise,
  deleteExercise
} = require('../controllers/exerciseController');

router.post(
  '/',
  authMiddleware('coach'),
  upload.single('video'), // Middleware d'upload vidéo
  createExercise
);

router.delete(
  '/:id',
  authMiddleware('coach'),
  deleteExercise
);

module.exports = router;
