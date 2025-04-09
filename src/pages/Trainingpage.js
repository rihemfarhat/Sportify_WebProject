import React from 'react';
import { Link } from "react-router-dom";
import '../style/TrainingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import trainingImage from '../assets/images/training.jpg';

const TrainingPage = () => {
  return (
    <section className="training-container">
<nav className="navbar">
  <Link to="/" className="logo-link">
    <img src={require('../assets/images/logo.png')} alt="logo" className="logosignup2" />
  </Link>

  <ul className="nav-links">
    <li><Link to="/TrainingPage" >Training</Link></li>
    <li><Link to="/Nutrition">Nutrition</Link></li>
    <li><Link to="/news">Blog</Link></li>
    <li><Link to="/ProductList">Shop</Link></li> 

  </ul>

  <div className="nav-buttons-coach">
    <Link to="/login_coach" className="login-btn-coach">Be a coach</Link>
  </div>

  <div className="nav-buttons">
    <Link to="/login" className="login-btn">Start Now</Link>
  </div>
</nav>
      <div className="text-section">
        <h1>
          Easy to use.<br />
          Effective. Tailored to your needs.
        </h1>
        <p>
          Over 350 exercises and personalized workouts that help you to become strong inside and out.
        </p>
        <Link to="/subscription"><button className='start'>Start now →</button></Link>
        
        
      </div>
      <div className="image-section">
        <div className="image-wrapper">
          <img src={trainingImage} alt="Workout" />
          <div className="bar white-bar"></div>
          <div className="bar blue-bar top"></div>
          <div className="bar blue-bar bottom"></div>
        </div>
        
      </div>
      
      
    </section>
  );
};

export default TrainingPage;
