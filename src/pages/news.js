// /src/pages/BlogPage.js
import '../style/news.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect pour récupérer les articles depuis l'API
  useEffect(() => {
    axios.get("http://localhost:5000/api/newsDB")
      .then(response => {
        setArticles(response.data); // Récupère tous les articles
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des articles", error);
        setError("Une erreur est survenue lors du chargement des articles.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="blog-page">
      <h1>Blog</h1>
      <div className="articles-list">
        {loading ? (
          <p>Chargement des articles...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="article">
              {/* Affichage dynamique des éléments */}
              {article.image && (
                <img src={article.image} alt="Illustration de l'article" className="article-image" />
              )}
              {article.title && (
                <h2 className="article-title">{article.title}</h2>
              )}
              {article.content && (
                <p className="article-text">{article.content}</p>
              )}
              {article.link && (
                <a href={article.link} className="article-link" target="_blank" rel="noopener noreferrer">
                  Lire l'article complet
                </a>
              )}
            </div>
          ))
        ) : (
          <p>Aucun article trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
