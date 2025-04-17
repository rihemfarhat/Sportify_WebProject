import React, { useState } from 'react';
import '../style/login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login_coach() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    console.log("Données envoyées:", { email, password });
  
    try {
      const response = await axios.post('http://localhost:5000/api/coach/login', { email, password });
      console.log('Connexion réussie', response.data);
    
      localStorage.setItem('token', response.data.token); // Stocke le token
      localStorage.setItem('userId', response.data.coach._id); // Stocke l'ID utilisateur
    
      navigate('/CoachInterface'); // Redirige vers la page du profil du coach
    } catch (err) {
      console.error('Erreur lors de la connexion:', err.response ? err.response.data : err.message);
      setError('Échec de la connexion. Vérifiez vos informations et réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-leftsection'>
        <img src={require('../assets/images/logo.png')} alt='logo' className='login-logo' />
        <h1>Login</h1>
        <p>Dive into your account</p>
        {error && <p className='error-message'>{error}</p>}
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='login-input-container'>
            <input
              type='email'
              placeholder='Email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='login-input-container'>
            <input
              type='password'
              placeholder='Password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className='login-here'>
          Don't have an account? <Link to='/sign_up_coach'>Sign up here</Link>
        </p>
      </div>
      <div className='login-rightsection'>
        <img
          src={require('../assets/images/signup.jpg')}
          alt='signup'
          className='login-signupimg'
          style={{ height: '1000px' }}
        />
        <div className='login-green-deco'></div>
        <p>Track All of Your <br /> Sports Activity</p>
      </div>
    </div>
  );
}

export default Login_coach;
