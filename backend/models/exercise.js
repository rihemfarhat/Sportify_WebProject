const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['cardio', 'strength', 'yoga', 'crossfit', 'other']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  isLive: { type: Boolean, default: false },
  scheduledTime: { type: Date },
  videoUrl: { type: String },
  coach: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Coach',
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exercise', exerciseSchema);