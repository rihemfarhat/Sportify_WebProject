import React from 'react';
import '../style/subscription.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';



function Subscription() {
    const [billingCycle, setBillingCycle] = useState('monthly');

    const pricing = {
        monthly: { basic: '9,99 €/mois', premium: '19,99 €/mois' },
        annual: { basic: '99,99 €/an', premium: '199,99 €/an' }
    };
    return (
        <div className="home-container">
          {/* Navbar */}
          <nav className="navbar">
            <img src={require('../assets/images/logo.png')} alt='logo' className='logosignup2' />
            <ul className="nav-links">
              <li><a href="#">Training</a></li>
              <li><a href="#">Nutrition</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Shop</a></li>
            </ul>
            <div className="nav-buttons-coach">
              <Link to="/login_coach" className="login-btn-coach">Be a coach</Link>
              </div>
            <div className="nav-buttons">
              <Link to="/login" className="login-btn">Start Now</Link>
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
    
          <section className="success-stories-payment">
            <h1>Success stories</h1>
            <p className="subtitle">97% of users experience dramatic progress after 12 weeks with the Sporify AI Coach*.</p>
    
            <div className="testimonials-payment">
              <div className="testimonial-payment">
                <h2>I was in the worst shape of my life</h2>
                <blockquote>
                  “(SPORTIFY) helped me get back to a level of fitness that I hadn’t seen in a very long time... I’ve started incorporating good habits into my daily routine.”
                </blockquote>
              </div>
    
              <div className="testimonial-payment">
                <h2>Back to a life I want to live</h2>
                <blockquote>
                  “I have never been stronger than I was during the five years after I started using Sportify.”
                </blockquote>
              </div>
    
              <div className="testimonial-payment">
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

export default Subscription;