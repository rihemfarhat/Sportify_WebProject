
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/homepage';
import Signup from './pages/sign_up';
import Signup_coach from './pages/sign_up_coach';
import Login from './pages/login';
import Login_coach from './pages/login_coach';
import Subscription from './pages/subscription';
import './App.css';



function App() {
  return (
    
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign_up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login_coach" element={<Login_coach />} />
        <Route path="/sign_up_coach" element={<Signup_coach />} />
        <Route path="/subscription" element={<Subscription />} />

      </Routes>
    </div>
  );
}

export default App;
