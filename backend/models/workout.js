const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Le nom est obligatoire'],
    trim: true
  },
  description: { 
    type: String, 
    required: [true, 'La description est obligatoire'] 
  },
  duration: { 
    type: Number, 
    required: true,
    min: [1, 'La durée doit être au moins 1 minute']
  },
  difficulty: { 
    type: String, 
    required: true,
    enum: ['Débutant', 'Intermédiaire', 'Avancé']
  },
  images: [{ 
    type: String,
    validate: {
      validator: function(v) {
        return v.startsWith('http');
      },
      message: 'URL invalide'
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);