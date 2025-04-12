import React from 'react';
import '../style/subscription.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';



function Subscription() {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const testimonials = [
      {
        name: "Rohith",
        age: 33,
        title: "I was in the worst shape of my life",
        text: `"Sportify helped me get back to a level of fitness that I hadn't seen in a very long time... I've started incorporating good habits into my daily routine."`,
        image: image1, 
      },
      {
        name: "Jonas",
        age: 50,
        title: "Back to a life I want to live",
        text: `"I have never been stronger than I was during the five years after I started using Sportify."`,
        image: image2, 
      },
      {
        name: "Lea",
        age: 27,
        title: "Once I saw and felt the change, I kept pushing myself",
        text: `"It was something that other workouts I had done before couldn't give me anymore."`,
        image:image3, 
      },
    ];

    const pricing = {
        monthly: { basic: '10 dt/mois', premium: '30 dt/mois' },
        annual: { basic: '110 dt/an', premium: '300 dt/an' }
    };
    return (
        <div className="home-container">
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
      
          <header className="hero-section-payment">
            <video autoPlay loop muted playsInline className="payment-video">
              <source src={require('../assets/videos/subscription.mp4')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
           

           
            <div className="form-overlay">
                <div className='videotitle'>
                    <h1>Join today with an extended 30-day free trial</h1>
                </div>
                <div className="billing-toggle">
                    <button 
                        onClick={() => setBillingCycle('monthly')} 
                        className={billingCycle === 'monthly' ? 'active' : ''}
                    >Monthly</button>
                    <button 
                        onClick={() => setBillingCycle('annual')} 
                        className={billingCycle === 'annual' ? 'active' : ''}
                    >Annual </button>
                </div>
                <div className="subscription-options">
                    <div className="option">
                        <h3>Basic Plan</h3>
                        <p>Limited access + standard <br/>content</p>
                        <p>{pricing[billingCycle].basic}</p>
                        <button>Subscribe</button>
                    </div>
                    <div className="option premium">
                        <h3>Premium Plan</h3>
                        <p>Unlimited access + exclusive <br/>content</p>
                        <p>{pricing[billingCycle].premium}</p>
                        <button>Subscribe</button>
                    </div>
                 </div>

            </div>
            </header>
    
            <section className="success-stories">
      <h2 className="title">Success Stories</h2>
      <p className="subtitle">
        97% of users experience dramatic progress after 12 weeks with the Sportify AI Coach*.
      </p>
      <div className="testimonials">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <h3>{testimonial.title}</h3>
            <p className="testimonial-text">{testimonial.text}</p>
            <p className="testimonial-name">
              <strong>{testimonial.name}</strong> • {testimonial.age} years old
            </p>
          </div>
        ))}
      </div>
      <p className="disclaimer">*Internal survey among 10,000 Sportify users.</p>
    </section>
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
}

export default Subscription;