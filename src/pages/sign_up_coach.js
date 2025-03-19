import React from 'react';
import '../style/sign_up.css';
import { Link } from 'react-router-dom';

function Signup_coach() {
  return (
    <div className='container'>
      <div className='leftsection'>
        <img src={require('../assets/images/logo.png')} alt='logo' className='logosignup' />
        <h1>Sign Up</h1>
        <p>Let's start with some facts about you</p>
        <form className='formsignup'>

          <div className='namefields'>
            <div className="input-container">
              <input type='text' id="first-name" placeholder='First Name' required />
            </div>
            <div className="input-container">
              <input type='text' id="last-name" placeholder='Last Name' required />
            </div>
          </div>
          <div className="input-container">
            <input type="email" id="email" placeholder="Email" required />
          </div>
          <div className="input-container">
            <input type="password" id="password" placeholder="Password" required />
          </div>

          
          <div className="input-container">
            <input type="password" id="confirm-password" placeholder="Confirm Password" required />
          </div>
          

          <div className="input-container">
            <input type='date' id="dob"  placeholder='Date of Birth'  required />
          </div>

          <button type='submit'>Sign Up</button>
        </form>
        <p className="loginhere" >You already have an account? <Link to="/login_coach">Login here</Link></p>
      </div>

      <div className='rightsection'>
        <img src={require('../assets/images/signup.jpg')} alt='signup' className='signupimg' style={{ height: '1000px',}}/>
        <div className="green-deco"></div>
        <p>Track All of Your <br /> Sports Activity</p>
      </div>
    </div>
  );
}

export default Signup_coach;
