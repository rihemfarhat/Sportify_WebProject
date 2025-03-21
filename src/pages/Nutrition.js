import React from 'react';
 import foodImage from '../assets/images/healthy.jpg'; // Vérifie que le chemin est bon !
 import '../style/Nutrition.css';
 import { Link } from 'react-router-dom';
 import photo1 from '../assets/images/photo1.jpg';
 import photo2 from '../assets/images/photo2.jpg';
 import photo3 from '../assets/images/photo3.jpg';
 import photo4 from '../assets/images/photo4.jpg';
 
 const Nutrition = () => {
   return (
     <div>
             <nav className="navbar">
               {/* Logo - clickable to Homepage */}
               <Link to="/" className="logo-link">
                 <img src={require('../assets/images/logo.png')} alt="logo" className="logosignup2" />
               </Link>
             
               <ul className="nav-links">
                 <li><a href="#">Training</a></li>
                 <li><Link to="/Nutrition">Nutrition</Link></li>
                 <li><Link to="/news">News</Link></li>
                 <li><a href="#">Shop</a></li>
               </ul>
             
               <div className="nav-buttons-coach">
                 <Link to="/login_coach" className="login-btn-coach">Be a coach</Link>
               </div>
             
               <div className="nav-buttons">
                 <Link to="/login" className="login-btn">Start Now</Link>
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
     
       
     <footer className="footer">
       <div className="footer-content">
         <p>&copy; 2025 SPORTIFY all in One. All rights reserved.</p>
         <ul className="footer-links">
           <li><a href="/">Home</a></li>
           <li><a href="/about">About</a></li>
           <li><a href="/contact">Contact</a></li>
         </ul>
       </div>
     </footer>
     
     </div>
   );
 };
 
 export default Nutrition;