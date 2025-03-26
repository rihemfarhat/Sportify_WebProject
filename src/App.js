
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/homepage';
import HomePage2 from './pages/homepage_postloguser';
import Signup from './pages/sign_up';
import Signup_coach from './pages/sign_up_coach';
import Login from './pages/login';
import Login_coach from './pages/login_coach';
import Subscription from './pages/subscription';
import Nutrition from './pages/Nutrition';
import Nutrition2 from './pages/nutrition_postloguser';
import Profile from './pages/profile_user';
import NewsPage from './pages/news';
import NewsPage2 from './pages/news_postloguser';
import './App.css';



function App() {
  return (
    
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage_postloguser" element={<HomePage2 />} />
        <Route path="/sign_up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login_coach" element={<Login_coach />} />
        <Route path="/sign_up_coach" element={<Signup_coach />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/Nutrition" element={<Nutrition />} />
        <Route path="/nutrition_postloguser" element={<Nutrition2 />} />

        <Route path="/news" element={<NewsPage/>} />
        <Route path="/profile_user" element={<Profile/>} />
        <Route path="/news_postloguser" element={<NewsPage2/>} />



      </Routes>
    </div>
  );
}

export default App;