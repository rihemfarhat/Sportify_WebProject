import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import HomePage2 from './pages/PostLoginUser/homepage_postloguser';
import Signup from './pages/sign_up';
import Signup_coach from './pages/sign_up_coach';
import Login from './pages/login';
import Login_coach from './pages/login_coach';
import Subscription from './pages/subscription';
import Nutrition from './pages/Nutrition';
import Nutrition2 from './pages/PostLoginUser/nutrition_postloguser';
import Profile from './pages/profile_user';
import NewsPage from './pages/news';
import NewsPage2 from './pages/PostLoginUser/news_postloguser';
import ProductList from './pages/ProductList';
import ProductList2 from './pages/PostLoginUser/ProductList_postloguser';
import EquipmentPage from './pages/EquipmentPage';
import EquipmentDetail from './pages/EquipmentDetail';
import WomenDetail from './pages/WomenDetail';
import AccessoiresDetail from './pages/AccessoriesDetail';
import MenDetail from './pages/MenDetail';
import MenPage from './pages/MenPage';
import AccessoriesPage from './pages/AccessoriesPage';
import CoachProfile from './pages/coach_form';
import ProductDetail from './pages/ProductDetail';
import TrainingPage from './pages/Trainingpage';
import TrainingPage2 from './pages/PostLoginUser/Trainingpage_postloguser';
import CoachInterface from './pages/CoachInterface';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmation from './pages/OrderConfirmation';
import WomenPage from "./pages/WomenPage";

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
        <Route path="/coach_form" element={<CoachProfile />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/CoachInterface" element={<CoachInterface />} />
        <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
        <Route path="/WomenPage" element={<WomenPage />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/Nutrition" element={<Nutrition />} />
        <Route path="/nutrition_postloguser" element={<Nutrition2 />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/profile_user" element={<Profile />} />
        <Route path="/news_postloguser" element={<NewsPage2 />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/ProductList_postloguser" element={<ProductList2 />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/equipment/:id" element={<EquipmentDetail />} />
        <Route path="/men/:id" element={<MenDetail />} />
        <Route path="/women/:id" element={<WomenDetail />} />
        <Route path="/accessoires/:id" element={<AccessoiresDetail />} />
        <Route path="/equipment" element={<EquipmentPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/TrainingPage" element={<TrainingPage />} />
        <Route path="/Trainingpage_postloguser" element={<TrainingPage2 />} />
        <Route path="/PaymentPage" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}

export default App;
