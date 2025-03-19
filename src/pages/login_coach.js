import React from 'react';
import '../style/login.css';
import { Link } from 'react-router-dom';



function Login_coach() {
  return (
    <div className='login-container'>
      {/* Section gauche : Formulaire */}
      <div className='login-leftsection'>
        <img src={require('../assets/images/logo.png')} alt='logo' className='login-logo' />
        <h1>Login</h1>
        <p>Dive into your account</p>

        <form className='login-form'>
          <div className="login-input-container">
            <input type="email" id="email" placeholder="Email" required />
          </div>
          <div className="login-input-container">
            <input type="password" id="password" placeholder="Password" required />
          </div>

          <button type='submit'>Login</button>
          
        </form>

        <p className="login-here">
          Don't have an account? <Link to="/sign_up_coach">Sign up here</Link>
        </p>
      </div>

      <div className='login-rightsection'>
        <img src={require('../assets/images/signup.jpg')} alt='signup' className='login-signupimg' style={{ height: '1000px',}} />
        <div className="login-green-deco"></div>
        <p>Track All of Your <br /> Sports Activity</p>
      </div>
    </div>
  );
}

export default Login_coach;
