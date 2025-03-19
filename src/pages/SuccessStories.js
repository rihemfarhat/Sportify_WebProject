import React from 'react';
import '../style/SuccessStories.css'; 

const SuccessStories = () => {
  return (
    <div className="success-stories">
      <h1>Success stories</h1>
      <p className="subtitle">97% of users experience dramatic progress after 12 weeks with the Freeletics AI Coach*.</p>

      <div className="testimonials">
        <div className="testimonial">
          <h2>I was in the worst shape of my life</h2>
          <blockquote>
            “(Freeletics) helped me get back to a level of fitness that I hadn’t seen in a very long time... I’ve started incorporating good habits into my daily routine.”
          </blockquote>
        </div>

        <div className="testimonial">
          <h2>Back to a life I want to live</h2>
          <blockquote>
            “I have never been stronger than I was during the five years after I started using Freeletics.”
          </blockquote>
        </div>

        <div className="testimonial">
          <h2>Once I saw and felt the change, I kept pushing myself</h2>
          <blockquote>
            “It was something that other workouts I had done before couldn’t give me anymore.”
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;