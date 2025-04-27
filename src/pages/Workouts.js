import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/WorkoutPage.css';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/workouts');
        setWorkouts(response.data);
        
        // Initialiser l'index d'image pour chaque workout
        const initialIndexes = {};
        response.data.forEach(workout => {
          initialIndexes[workout._id] = 0;
        });
        setCurrentImageIndex(initialIndexes);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const nextImage = (workoutId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [workoutId]: (prev[workoutId] + 1) % totalImages
    }));
  };

  const prevImage = (workoutId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [workoutId]: (prev[workoutId] - 1 + totalImages) % totalImages
    }));
  };

  if (loading) return <div className="loading">Chargement en cours...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="workout-container">
      <h1>Liste des Workouts</h1>
      <div className="workout-grid">
        {workouts.map((workout) => (
          <div key={workout._id} className="workout-card">
            <div className="workout-images">
              <div 
                className="image-slider"
                style={{ transform: `translateX(-${currentImageIndex[workout._id] * 100}%)` }}
              >
                {workout.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000${image}`}
                    alt={`${workout.name} ${index + 1}`}
                    className="workout-image"
                  />
                ))}
              </div>
              
              {workout.images.length > 1 && (
                <>
                  <button 
                    className="slider-arrow prev"
                    onClick={() => prevImage(workout._id, workout.images.length)}
                  >
                    &lt;
                  </button>
                  <button 
                    className="slider-arrow next"
                    onClick={() => nextImage(workout._id, workout.images.length)}
                  >
                    &gt;
                  </button>
                  <div className="slider-controls">
                    {workout.images.map((_, index) => (
                      <div
                        key={index}
                        className={`slider-dot ${currentImageIndex[workout._id] === index ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(prev => ({
                          ...prev,
                          [workout._id]: index
                        }))}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="workout-info">
              <h2>{workout.name}</h2>
              <p><strong>Durée:</strong> {workout.duration} minutes</p>
              <p><strong>Difficulté:</strong> {workout.difficulty}</p>
              <p><strong>Description:</strong> {workout.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;