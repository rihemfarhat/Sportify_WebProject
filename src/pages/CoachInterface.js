import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisation de useNavigate pour React Router v6
import { FaBell, FaSignOutAlt } from 'react-icons/fa'; // Icônes de notification et déconnexion
import '../style/CoachInterface.css';

const CoachInterface = () => {
  const [exercises, setExercises] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('cardio');
  const [difficulty, setDifficulty] = useState('beginner');
  const [isLive, setIsLive] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token'); // Retirer le token
    navigate('/login_coach'); // Rediriger vers la page de connexion
  };

  useEffect(() => {
    const fetchExercises = async () => {
      const token = localStorage.getItem('token'); // Vérifier si le token est présent
      if (!token) {
        // Si le token n'est pas présent, rediriger l'utilisateur vers la page de connexion
        navigate('/login');
        return; // Arrêter l'exécution de la fonction si le token est absent
      }
  
      try {
        const res = await fetch('http://localhost:5000/api/exercises/coach', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch exercises');
        const data = await res.json();
        setExercises(data); // Mettre à jour l'état avec les exercices récupérés
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };
  
    fetchExercises();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('difficulty', difficulty);
    formData.append('isLive', isLive);
    
    if (isLive) {
      formData.append('scheduledTime', scheduledTime);
    } else if (selectedFile) {
      formData.append('video', selectedFile);
    }

    try {
      const res = await fetch('http://localhost:5000/api/exercises', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      setExercises([...exercises, data]);
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('cardio');
    setDifficulty('beginner');
    setIsLive(false);
    setScheduledTime('');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const deleteExercise = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:5000/api/exercises/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setExercises(exercises.filter((ex) => ex._id !== id)); // Utilisez _id au lieu de id
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  };

  return (
    <div className="coach-container">
      {/* Navbar */}
      <nav className="navbarcoach">
        <div className="navbar-left">
          <h1 className="navbarcoach-logo">Coach Dashboard</h1>
        </div>
        <div className="navbar-right">
          <button className="notification-btn">
            <FaBell size={24} /> {/* Icône de notification */}
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt size={24} /> {/* Icône de déconnexion */}
          </button>
        </div>
      </nav>

      
      <div className="coach-content">
        {/* Formulaire pour ajouter des exercices */}
        <section className="exercise-form">
          <h2>Add New Exercise</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="cardio">Cardio</option>
                  <option value="strength">Strength</option>
                  <option value="yoga">Yoga</option>
                  <option value="crossfit">CrossFit</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isLive}
                  onChange={(e) => setIsLive(e.target.checked)}
                />
                Live Session
              </label>
            </div>

            {isLive && (
              <div className="form-group">
                <label>Live Session Date & Time</label>
                <input
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  required={isLive}
                />
              </div>
            )}

            {!isLive && (
              <div className="form-group">
                <label>Exercise Video</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="video/*"
                  required={!isLive}
                />
              </div>
            )}

            <button type="submit" className="submit-btn">
              Publish Exercise
            </button>
          </form>
        </section>

        {/* Liste des exercices publiés */}
        <section className="exercises-list">
          <h2>Your Published Exercises</h2>
          {exercises.length === 0 ? (
            <p className="no-exercises">No exercises published yet</p>
          ) : (
            <div className="exercises-grid">
              {exercises.map((exercise) => (
                <div key={exercise._id} className="exercise-card">
                  <div className="exercise-header">
                    <h3>{exercise.title}</h3>
                    <span className={`difficulty ${exercise.difficulty}`}>
                      {exercise.difficulty === 'beginner' ? 'Beginner' : 
                        exercise.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced'}
                    </span>
                  </div>
                  <p className="category">{exercise.category}</p>
                  <p className="description">{exercise.description}</p>

                  {exercise.isLive ? (
                    <div className="live-info">
                      <span className="live-badge">LIVE</span>
                      <p>Scheduled for: {new Date(exercise.scheduledTime).toLocaleString()}</p>
                    </div>
                  ) : (
                    <div className="video-preview">
                      {exercise.videoUrl && (
                        <video controls width="250">
                          <source src={`http://localhost:5000${exercise.videoUrl}`} type="video/mp4" />
                          Votre navigateur ne supporte pas les vidéos HTML5.
                        </video>
                      )}
                    </div>
                  )}
                  
                  <button 
                    onClick={() => deleteExercise(exercise._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CoachInterface;
