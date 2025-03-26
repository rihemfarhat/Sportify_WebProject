const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const articleRoutes = require("./routes/articles");
const authRoutes = require("./routes/user");
const listEndpoints = require('express-list-endpoints');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Pour accepter les requêtes avec un corps JSON

// Connexion à MongoDB pour l'authentification
mongoose.connect(process.env.MONGO_URI_AUTH || "mongodb://localhost:27017/authDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connecté à MongoDB pour l'authentification"))
  .catch((error) => console.error("❌ Erreur MongoDB:", error));

// Connexion à MongoDB pour les articles
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

console.log("📌 Liste des routes enregistrées :", listEndpoints(app));

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur interne du serveur" });
});

app.listen(PORT, () => console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`));
