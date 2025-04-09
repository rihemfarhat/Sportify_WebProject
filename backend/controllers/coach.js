// controllers/coachController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Coach = require('../models/coach');

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dob, gender } = req.body;
    
    // Validation basique
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const existingCoach = await Coach.findOne({ email });
    if (existingCoach) {
      return res.status(400).json({ message: "Un coach avec cet email existe déjà" });
    }
    

    const newCoach = new Coach({ 
      firstName, 
      lastName, 
      email, 
      password,
      dob, 
      gender 
    });

    await newCoach.save();
    
    // Création du token après inscription réussie
    const token = jwt.sign(
      { id: newCoach._id, role: 'coach' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      message: "Inscription réussie", 
      token,
      coachId: newCoach._id 
    });
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    res.status(500).json({ 
      message: "Erreur serveur", 
      error: error.message 
    });
  }
};


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const coach = await Coach.findOne({ email });
  
      if (!coach) {
        return res.status(400).json({ message: "Utilisateur non trouvé" });
      }
  
      console.log('Mot de passe reçu:', password);
      console.log('Mot de passe base:', coach.password);
      console.log('Match:', await coach.comparePassword(password));
      
  
      const isMatch = await coach.comparePassword(password); // Utilisation de la méthode comparePassword
  
      if (!isMatch) {
        return res.status(400).json({ message: "Identifiants invalides" });
      }
  
      const token = jwt.sign({ id: coach._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, coach });
    } catch (error) {
      console.error("Erreur serveur:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  




exports.getCoachById = async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id).select('-password');
    if (!coach) {
      return res.status(404).json({ message: "Coach non trouvé" });
    }
    res.json(coach);
  } catch (error) {
    console.error("Erreur de récupération:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getCoachProfile = async (req, res) => {
  try {
    const coach = await Coach.findById(req.user.id).select('-password');
    if (!coach) {
      return res.status(404).json({ message: 'Coach non trouvé' });
    }
    res.json(coach);
  } catch (error) {
    console.error("Erreur de profil:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};