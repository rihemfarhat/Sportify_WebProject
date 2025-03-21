// /models/articles.js
const mongoose = require('mongoose');

// Définition du schéma de l'article
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // URL de l'image
  link: { type: String } // Lien vers l'article
});

// Création du modèle à partir du schéma
const Article = mongoose.model('Article', articleSchema, 'articles');

module.exports = Article;
