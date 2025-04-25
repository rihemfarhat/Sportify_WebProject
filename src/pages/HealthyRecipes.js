import React, { useState } from 'react';
import { FaLeaf, FaHeart, FaRunning, FaUtensils } from 'react-icons/fa';
import '../style/healthy.css';

const HealthyRecipes = () => {
  const [activeTab, setActiveTab] = useState('recipes');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample recipe data
  const recipes = [
    {
      id: 1,
      title: "Quinoa Power Bowl",
      ingredients: ["quinoa", "kale", "avocado", "cherry tomatoes", "chickpeas", "lemon tahini dressing"],
      time: 20,
      difficulty: "Easy",
      tags: ["vegan", "high-protein", "gluten-free"],
      tips: "Massage the kale with lemon juice to make it more tender."
    },
    {
      id: 2,
      title: "Turmeric Golden Milk",
      ingredients: ["almond milk", "turmeric", "cinnamon", "ginger", "black pepper", "honey"],
      time: 10,
      difficulty: "Very Easy",
      tags: ["anti-inflammatory", "vegan", "digestive health"],
      tips: "Add a pinch of black pepper to enhance turmeric absorption."
    },
    {
      id: 3,
      title: "Rainbow Veggie Stir-Fry",
      ingredients: ["bell peppers", "broccoli", "carrots", "snow peas", "tofu", "ginger", "garlic", "low-sodium soy sauce"],
      time: 25,
      difficulty: "Medium",
      tags: ["vegetarian", "high-fiber", "immune-boosting"],
      tips: "Cut veggies uniformly for even cooking."
    }
  ];

  // Wellness tips
  const wellnessTips = [
    "Start your day with a glass of warm lemon water to kickstart digestion.",
    "Practice mindful eating - chew each bite at least 20 times.",
    "Aim for 7-9 hours of quality sleep for optimal health.",
    "Take a 5-minute movement break every hour if you sit for long periods.",
    "Incorporate fermented foods like kimchi or kefir for gut health."
  ];

  // Filter recipes based on search term
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase())) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="healthy-recipes-container">
      <header className="health-header">
        <h1><FaLeaf /> Nourish & Thrive</h1>
        <p>Your guide to delicious nutrition and holistic wellness</p>
      </header>

      <div className="health-nav">
        <button 
          className={activeTab === 'recipes' ? 'active' : ''}
          onClick={() => setActiveTab('recipes')}
        >
          <FaUtensils /> Healthy Recipes
        </button>
        <button 
          className={activeTab === 'tips' ? 'active' : ''}
          onClick={() => setActiveTab('tips')}
        >
          <FaHeart /> Wellness Tips
        </button>
      </div>

      {activeTab === 'recipes' && (
        <div className="recipes-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search recipes by name, ingredient or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="recipe-grid">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <div key={recipe.id} className="recipe-card">
                  <div className="recipe-header">
                    <h3>{recipe.title}</h3>
                    <div className="recipe-meta">
                      <span>{recipe.time} mins</span>
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                  <div className="recipe-body">
                    <h4>Ingredients:</h4>
                    <ul>
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <div className="recipe-tags">
                      {recipe.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="recipe-tip">
                      <FaLeaf className="tip-icon" />
                      <p>{recipe.tips}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No recipes found matching your search. Try different keywords!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="wellness-tips">
          <h2><FaHeart /> Daily Wellness Inspiration</h2>
          <div className="tips-grid">
            {wellnessTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-number">{index + 1}</div>
                <p>{tip}</p>
              </div>
            ))}
          </div>
          <div className="wellness-challenge">
            <h3><FaRunning /> This Week's Challenge</h3>
            <p>Try one new vegetable you've never eaten before. Notice its texture, flavor, and how it makes you feel!</p>
          </div>
        </div>
      )}

      <footer className="health-footer">
        <p>Remember: Small, consistent changes lead to big health transformations!</p>
      </footer>
    </div>
  );
};

export default HealthyRecipes;