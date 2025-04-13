const path = require('path'); // <-- Ajoutez cette ligne
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const articleRoutes = require("./routes/articles");
const authRoutes = require("./routes/user");
const coachRoutes = require('./routes/coach');
const coachInfoRoutes = require("./routes/coach_info"); // Route pour coachInfo
const productRoutes = require('./routes/productRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const accessoireRoutes = require('./routes/accessoireRoutes');
const listEndpoints = require('express-list-endpoints');
const exerciseRoutes = require('./routes/exercise');
const womenRoutes = require('./routes/womenRoutes');
const menRoutes = require("./routes/menRoutes");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de CORS et JSON
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/api/exercises', exerciseRoutes);


// Connexion à MongoDB pour l'authentification (authDB)
mongoose.connect(process.env.MONGO_URI_AUTH || "mongodb://localhost:27017/authDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connecté à MongoDB pour l'authentification"))
  .catch((error) => console.error("❌ Erreur MongoDB:", error));

// Connexion à MongoDB pour les articles (newsDB)
const newsDB = mongoose.createConnection(process.env.MONGO_URI_NEWS || "mongodb://localhost:27017/newsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
newsDB.once("open", () => console.log("✅ Connecté à MongoDB pour les articles"));

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/articles", (req, res, next) => {
  req.newsDB = newsDB; // Passe la connexion MongoDB à la route des articles
  next();
}, articleRoutes);

app.use('/api/coach', (req, res, next) => {
  req.db = mongoose.connection; // Assurez-vous que la bonne connexion MongoDB est utilisée
  next();
}, coachRoutes); // Route principale pour les coachs
app.use("/api/coach_info", coachInfoRoutes); // CoachInfo (informations détaillées)
app.use("/api", productRoutes);
app.use('/api', equipmentRoutes);
app.use('/api', accessoireRoutes);
app.use('/api/women', womenRoutes);
app.use("/api/men", menRoutes);


console.log("📌 Liste des routes enregistrées :", listEndpoints(app));

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur interne du serveur" });
});

app.listen(PORT, () => console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`));
