import { Link } from "react-router-dom";
import React from 'react';
import "../style/HomePage.css";

export default function HomePage() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <img src={require('../assets/images/logo.png')} alt='logo' className='logosignup2' />
        <ul className="nav-links">
          <li><a href="#">Training</a></li>
          <li><a href="#">Nutrition</a></li>
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

      {/* Hero Section with Video */}
      <header className="hero-section">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={require('../assets/videos/homepage.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-text-overlay">
        <Link to="/subscription">
        <button className="hero-button">Get your personalized training plan now →</button>
      </Link>        </div>
      </header>

      {/* Success Stories Section */}
      <section className="success-stories">
        <h1>Success stories</h1>
        <p className="subtitle">97% of users experience dramatic progress after 12 weeks with the Sporify AI Coach*.</p>

        <div className="testimonials">
          <div className="testimonial">
            <h2>I was in the worst shape of my life</h2>
            <blockquote>
              “(SPORTIFY) helped me get back to a level of fitness that I hadn’t seen in a very long time... I’ve started incorporating good habits into my daily routine.”
            </blockquote>
          </div>

          <div className="testimonial">
            <h2>Back to a life I want to live</h2>
            <blockquote>
              “I have never been stronger than I was during the five years after I started using Sportify.”
            </blockquote>
          </div>

          <div className="testimonial">
            <h2>Once I saw and felt the change, I kept pushing myself</h2>
            <blockquote>
              “It was something that other workouts I had done before couldn’t give me anymore.”
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}