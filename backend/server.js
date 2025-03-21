// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const articleRoutes = require('./routes/articles'); // Import des routes d'articles

const app = express();
const port = 5000;

// Middleware pour permettre les requêtes cross-origin (CORS)
app.use(cors());
app.use(express.json()); // Middleware pour traiter le corps des requêtes en JSON

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/newsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connecté à MongoDB'))
.catch((err) => console.error('❌ Erreur de connexion MongoDB:', err));

// Utilisation des routes d'articles
app.use('/api/newsDB', articleRoutes);

// Lancement du serveur
app.listen(port, () => {
  console.log(`🚀 Serveur backend lancé sur http://localhost:${port}`);
});
