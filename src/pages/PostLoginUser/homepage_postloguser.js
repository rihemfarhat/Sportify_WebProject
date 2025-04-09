import { Link } from "react-router-dom";
import React  , { useState }from 'react';
import "../../style/PostLoginUser/homepage_postloguser.css";
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

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

const commentsData = [
  {
    name: "Melvin Alex",
    text: "Really good app. Creates a good daily discipline. Also, it helps when you supplement the exercise with a good diet - this can be through Sportify Nutrition app or your own diet. I lost 4kg in two weeks.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Paula Rodrigues",
    text: "After trying several training apps, I can say that Sportify is the most complete one. The programmes are really effective! You can easily track your progress and change along the way. Highly recommend!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Adolfo Quiroz",
    text: "I have been using this for 6 months, one hour per day approx and I perceive better results than when I was at the gym. Very satisfied.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

export default function HomePage2() {
  const [comments, setComments] = useState(commentsData);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const newEntry = {
      name: "Anonymous",
      text: newComment,
      rating,
      image: "https://randomuser.me/api/portraits/lego/5.jpg",
    };
    setComments([newEntry, ...comments]);
    setNewComment("");
  };

  return (
    <div className="home-container">
      <nav className="navbar">
  <Link to="/homepage_postloguser" className="logo-link">
    <img src={require('../../assets/images/logo.png')} alt="logo" className="logosignup2" />
  </Link>

  <ul className="nav-links">
  <li><a href="#">Training</a></li>
    <li><Link to="/nutrition_postloguser">Nutrition</Link></li>
    <li><Link to="/news_postloguser">Blog</Link></li>
    <li><Link to="/ProductList_postloguser">Shop</Link></li> 

  </ul>


  <div className="profile-buttons">
    <Link to="/profile_user" className="profile-btn">Profile</Link>
  </div>
</nav>
      <header className="hero-section">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={require('../../assets/videos/home.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-text-overlay">
        <Link to="/subscription">
        <button className="hero-button">Get your personalized training plan now →</button>
      </Link>        </div>
      </header>

      {/* Success Stories Section */}
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

    <section className="comments">
      <h2>What users say about Freeletics</h2>
      <div className="add-comment">
        <textarea
          placeholder="Write your review..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="rating-input">
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {star} ★
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleAddComment}>Post Review</button>
      </div>
      
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <img src={comment.image} alt={comment.name} />
            <div className="comment-content">
              <h3>{comment.name}</h3>
              <p className="stars">{"★".repeat(comment.rating)}{"☆".repeat(5 - comment.rating)}</p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
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
}