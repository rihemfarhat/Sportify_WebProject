import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import "../style/AccessoriesList.css";

const MenPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
      axios
          .get("http://localhost:5000/api/men")
          .then((response) => {
              setProducts(response.data);
              setFilteredProducts(response.data);
              setLoading(false);
          })
          .catch((error) => {
              console.error("Erreur chargement produits homme", error);
              setError("Erreur lors du chargement.");
              setLoading(false);
          });
  }, []);

  const handleSearch = (e) => {
      setSearchQuery(e.target.value);
      const filtered = products.filter(item =>
          item.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredProducts(filtered);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
      <div className="accessory-list-page">
          <nav className="navbar2">
              <Link to="/" className="logo-link2">
                  <img src={require("../assets/images/logo.png")} alt="logo" className="logosignup2" />
              </Link>

              <ul className="nav-links2">
                  <li><Link to="/TrainingPage">Training</Link></li>
                  <li><Link to="/Nutrition">Nutrition</Link></li>
                  <li><Link to="/news">Blog</Link></li>
                  <li><Link to="/ProductList">Shop</Link></li>
              </ul>

              <form className="search-form">
                  <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearch}
                      placeholder="Search men..."
                      className="search-input"
                  />
                  <button type="submit" className="search-icon-btn">
                      <FontAwesomeIcon icon={faSearch} size="lg" />
                  </button>
              </form>

              <div className="nav-icons2">
                  <Link to="/cart" className="nav-icon2">
                      <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                  </Link>
              </div>

              <div className="nav-buttons-coach2">
                  <Link to="/login_coach" className="login-btn-coach2">Be a coach</Link>
              </div>

              <div className="nav-buttons2">
                  <Link to="/login" className="login-btn2">Start Now</Link>
              </div>
          </nav>

          <main className="accessory-main-content">
              <section className="featured-accessories">
                  <h2 className="section-title">Men's Products</h2>
                  <div className="accessory-grid">
                      {loading && <p>Loading products...</p>}
                      {error && <p>{error}</p>}
                      {!loading && currentItems.length > 0 ? (
                          currentItems.map((item) => (
                              <div key={item._id} className="accessory-card">
                                  <img src={item.image} alt={item.title} />
                                  <h3>{item.title}</h3>
                                  <p>{item.price}</p>
                                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                                      View Product
                                  </a>
                              </div>
                          ))
                      ) : (
                          <p>No Men’s products found.</p>
                      )}
                  </div>

                  <div className="pagination">
                      {Array.from({ length: totalPages }, (_, index) => (
                          <button
                              key={index + 1}
                              className={currentPage === index + 1 ? "active" : ""}
                              onClick={() => setCurrentPage(index + 1)}
                          >
                              {index + 1}
                          </button>
                      ))}
                      <button 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                      >
                          Next →
                      </button>
                  </div>
              </section>
          </main>

          <footer className="news-page-footer">
              <div className="news-footer-container">
                  <div className="news-footer-section">
                      <h4>About Us</h4>
                      <p>Your journey to fitness starts here with our expert guidance and community support.</p>
                  </div>

                  <div className="news-footer-section">
                      <h4>Quick Links</h4>
                      <ul className="news-footer-links">
                          <li><Link to="/">Home</Link></li>
                          <li><Link to="/nutrition">Nutrition</Link></li>
                          <li><Link to="/news">Blog</Link></li>
                          <li><Link to="/ProductList">Shop</Link></li>
                      </ul>
                  </div>

                  <div className="news-footer-section">
                      <h4>Connect With Us</h4>
                      <div className="news-social-links">
                          <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                          <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                          <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                          <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
                      </div>
                  </div>
              </div>

              <div className="news-footer-bottom">
                  <p>&copy; 2025 SPORTIFY all in One. All rights reserved.</p>
              </div>
          </footer>
      </div>
  );
};

export default MenPage;
