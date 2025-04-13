const Exercise = require('../models/Exercise');
const path = require('path');

// 📌 Créer un exercice
const createExercise = async (req, res) => {
  try {
    const { title, description, category, difficulty, isLive, scheduledTime } = req.body;
    const coachId = req.user.id;

    const videoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const exercise = new Exercise({
      title,
      description,
      category,
      difficulty,
      isLive,
      scheduledTime: isLive === 'true' ? scheduledTime : null, // booléen envoyé en string
      videoUrl,
      coach: coachId
    });

    await exercise.save();
    res.status(201).json(exercise);
  } catch (error) {
    console.error("Error creating exercise:", error);
    res.status(500).json({ error: error.message });
  }
};

// 🗑️ Supprimer un exercice
const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await Exercise.findById(id);
    if (!exercise) return res.status(404).json({ error: "Exercise not found" });

    await exercise.deleteOne();
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    console.error("Error deleting exercise:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createExercise,
  deleteExercise
};
