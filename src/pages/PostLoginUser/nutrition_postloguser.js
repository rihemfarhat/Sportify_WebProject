import React from 'react';
import foodImage from '../../assets/images/healthy.jpg'; // Vérifie que le chemin est bon !
import '../../style/PostLoginUser/nutrition_postloguser.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Nutrition2 = () => {
  return (
    <div>
                <nav className="navbar">
            <Link to="/homepage_postloguser" className="logo-link">
              <img src={require('../../assets/images/logo.png')} alt="logo" className="logosignup2" />
            </Link>
          
  <ul className="nav-links">
      <li><Link to="/TrainingPage" >Training</Link></li>
      <li><Link to="/Nutrition">Nutrition</Link></li>
      <li><Link to="/news">Blog</Link></li>
      <li><Link to="/ProductList">Shop</Link></li> 

  </ul>
          
          
            <div className="profile-buttons">
              <Link to="/profile_user" className="profile-btn">Profile</Link>
            </div>
          </nav>
                    

    
    <div className="nutrition-container">
        
      {/* Image en haute qualité */}
      <img src={foodImage} alt="Healthy lifestyle" className="nutrition-image" />

      {/* Overlay */}
      <div className="nutrition-overlay"></div>
      
      {/* Contenu principal */}
      <div className="nutrition-content">
        <h1 className="nutrition-title">Eat clean.</h1>
        <h2 className="nutrition-subtitle">Reach your goals.</h2>
        <p className="nutrition-text">
          Cutting-edge digital nutrition coach. Tailored meal plans. Foodie-grade recipes.
        </p>

        <button className="nutrition-button">Start eating clean now →</button>
      </div>
    </div>
    
      
    <footer className="news-page-footer">
            <div className="news-footer-container">
              <div className="news-footer-section">
                <h4>About Us</h4>
                <p>Your journey to fitness starts here with our expert guidance and community support.</p>
              </div>
              
                           <div className="news-footer-section">
                             <h4>Quick Links</h4>
                             <ul className="news-footer-links">
                               <li><Link to="/homepage_postloguser">Home</Link></li>
                               <li><Link to="/nutrition_postloguser">Nutrition</Link></li>
                               <li><Link to="/news_postloguser">Blog</Link></li>
                               <li><Link to="/ProductList_postloguser">Shop</Link></li>
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

export default Nutrition2;