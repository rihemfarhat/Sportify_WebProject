import React from 'react';
import foodImage from '../assets/images/healthy.jpg'; // Vérifie que le chemin est bon !
import '../style/Nutrition.css';
import { Link } from 'react-router-dom';
import carbImage from '../assets/images/carbs.jpg';
import proteinImage from '../assets/images/protein.jpg';
import waterImage from '../assets/images/water.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const Nutrition = () => {
  return (
    <div>
         <nav className="navbar">
           <Link to="/" className="logo-link">
             <img src={require('../assets/images/logo.png')} alt="logo" className="logosignup2" />
           </Link>
       
           <div className="nav-center">
             <ul className="nav-links">
               <li><Link to="/TrainingPage">Training</Link></li>
               <li><Link to="/Nutrition">Nutrition</Link></li>
               <li><Link to="/news">Blog</Link></li>
               <li><Link to="/ProductList">Shop</Link></li>
             </ul>
           </div>
       
           <div className="nav-right">
             <div className="nav-coach-cart">
               <Link to="/CartPage" className="nav-icon">
                 <FontAwesomeIcon icon={faShoppingCart} size="lg" />
               </Link>
               <Link to="/login_coach" className="login-btn-coach">Be a coach</Link>
             </div>
       
             <div className="nav-buttons">
               <Link to="/login" className="login-btn">Start Now</Link>
             </div>
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
    
    <div className="food-importance-container">
  <h1 className="food-importance-heading">What are the most important foods for exercise?</h1>
  
  <div className="food-categories-wrapper">
    <div className="food-category-card">
      <img src={carbImage} alt="Carbohydrates" className="food-category-image" />
      <div className="food-category-details">
        <h2 className="food-category-name">Carbohydrate</h2>
        <p className="food-category-description">
          The main role of carbohydrates in physical activity is to provide energy. 
          Carbohydrate is the key fuel for the brain and for muscles during exercise.
        </p>
        <a href="#carb-details" className="food-category-link">Learn more</a>
      </div>
    </div>
    <div className="food-category-separator"></div>
    
    <div className="food-category-card">
      <img src={proteinImage} alt="Protein" className="food-category-image" />
      <div className="food-category-details">
        <h2 className="food-category-name">Protein</h2>
        <p className="food-category-description">
          Protein is important in sports performance as it can boost glycogen storage, 
          reduce muscle soreness and promote muscle repair.
        </p>
        <a href="#protein-details" className="food-category-link">Learn more</a>
      </div>
    </div>
    <div className="food-category-separator"></div>
    
    <div className="food-category-card">
      <img src={waterImage} alt="Water" className="food-category-image" />
      <div className="food-category-details">
        <h2 className="food-category-name">Water</h2>
        <p className="food-category-description">
          Drinking enough fluid is essential for maximising exercise performance 
          and ensuring optimum recovery.
        </p>
        <a href="#water-details" className="food-category-link">Learn more</a>
      </div>
    </div>
  </div>
</div>

      
    <footer className="page-footer">
            <div className="footer-container">
              <div className="footer-section">
                <h4>About Us</h4>
                <p>Your journey to fitness starts here with our expert guidance and community support.</p>
              </div>
              
              <div className="footer-section">
             <h4>Quick Links</h4>
              <ul className="footer-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/nutrition">Nutrition</Link></li>
                 <li><Link to="/news">Blog</Link></li>
                 <li><Link to="/ProductList">Shop</Link></li>
              </ul>
             </div>
              
              <div className="footer-section">
                <h4>Connect With Us</h4>
                <div className="social-links">
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

export default Nutrition;