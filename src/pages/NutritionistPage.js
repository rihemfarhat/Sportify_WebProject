import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Nutritionist.css';

// Import images directly
import nutri1 from '../assets/images/nutritionist1.jpg';
import nutri2 from '../assets/images/nutritionist2.jpg';
import nutri3 from '../assets/images/nutritionist3.jpg';
import nutri4 from '../assets/images/nutritionist4.jpg';
import nutri5 from '../assets/images/nutritionist5.jpg';
import nutri6 from '../assets/images/nutritionist6.jpg';

const NutritionistPage = () => {
  const [nutritionists, setNutritionists] = useState([]);
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data with direct image imports
  const mockNutritionists = [
    {
      id: 1,
      name: "Dr. Amina Ben Salah",
      specialty: "Weight Management",
      location: "Tunis",
      rating: 4.8,
      reviews: 124,
      image: nutri1,
      available: "Online & In-person",
      languages: ["Arabic", "French"],
      bio: "Certified nutritionist with 10 years of experience helping clients achieve sustainable weight loss through personalized meal plans."
    },
    {
      id: 2,
      name: "Dr. Karim Trabelsi",
      specialty: "Sports Nutrition",
      location: "Sousse",
      rating: 4.9,
      reviews: 87,
      image: nutri2,
      available: "In-person",
      languages: ["Arabic", "French", "English"],
      bio: "Former athlete turned nutrition expert specializing in performance optimization for athletes."
    },
    {
      id: 3,
      name: "Leila Boukadi, Dietitian",
      specialty: "Plant-Based Nutrition",
      location: "Sfax",
      rating: 4.7,
      reviews: 65,
      image: nutri3,
      available: "Online",
      languages: ["Arabic", "French"],
      bio: "Dietitian passionate about helping people transition to plant-based diets while meeting all nutritional needs."
    },
    {
      id: 4,
      name: "Dr. Hichem Gharbi",
      specialty: "Diabetes Management",
      location: "Nabeul",
      rating: 4.9,
      reviews: 112,
      image: nutri4,
      available: "Online & In-person",
      languages: ["Arabic", "French"],
      bio: "Endocrinology-focused nutritionist helping patients manage and reverse type 2 diabetes through dietary interventions."
    },
    {
      id: 5,
      name: "Salma Abid, Dietitian",
      specialty: "Pediatric Nutrition",
      location: "Djerba",
      rating: 4.8,
      reviews: 93,
      image: nutri5,
      available: "In-person",
      languages: ["Arabic", "French", "German"],
      bio: "Pediatric dietitian specializing in picky eaters, food allergies, and creating healthy eating habits for children."
    },
    {
      id: 6,
      name: "Dr. Marwa Fersi",
      specialty: "Gut Health",
      location: "Bizerte",
      rating: 4.7,
      reviews: 78,
      image: nutri6,
      available: "Online",
      languages: ["Arabic", "French", "Italian"],
      bio: "Functional medicine nutritionist focusing on gut health, food intolerances, and digestive disorders."
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setNutritionists(mockNutritionists);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    let results = [...mockNutritionists];
    
    if (location) {
      results = results.filter(n => 
        n.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (specialty) {
      results = results.filter(n => 
        n.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }
    
    setNutritionists(results);
    setLoading(false);
  };

  const resetFilters = () => {
    setLocation('');
    setSpecialty('');
    setNutritionists(mockNutritionists);
  };

  if (error) {
    return (
      <div className="nutritionist-error">
        <h2>Error loading nutritionists</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
        <Link to="/" className="back-home">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="nutritionist-page">
      <div className="nutritionist-hero">
        <div className="hero-content">
          <h1>Find Your Perfect Nutritionist</h1>
          <p>Connect with certified nutrition professionals who can help you achieve your health goals</p>
        </div>
      </div>
      
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              placeholder="City or region"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="specialty">Specialty</label>
            <select
              id="specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              <option value="Weight Management">Weight Management</option>
              <option value="Sports Nutrition">Sports Nutrition</option>
              <option value="Plant-Based Nutrition">Plant-Based Nutrition</option>
              <option value="Diabetes Management">Diabetes Management</option>
              <option value="Pediatric Nutrition">Pediatric Nutrition</option>
              <option value="Gut Health">Gut Health</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="search-btn">Search</button>
            <button type="button" onClick={resetFilters} className="reset-btn">Reset Filters</button>
          </div>
        </form>
      </div>
      
      <div className="results-container">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading nutritionists...</p>
          </div>
        ) : (
          <>
            <h2 className="results-title">
              {nutritionists.length} {nutritionists.length === 1 ? 'Nutritionist Found' : 'Nutritionists Found'}
            </h2>
            
            {nutritionists.length === 0 ? (
              <div className="no-results">
                <p>No nutritionists match your search criteria.</p>
                <button onClick={resetFilters}>Show all nutritionists</button>
              </div>
            ) : (
              <div className="nutritionist-grid">
                {nutritionists.map((nutri) => (
                  <div key={nutri.id} className="nutritionist-card">
                    <div className="card-image">
                      <img 
                        src={nutri.image} 
                        alt={nutri.name} 
                      />
                    </div>
                    <div className="card-content">
                      <h3>{nutri.name}</h3>
                      <p className="specialty">{nutri.specialty}</p>
                      <p className="location">{nutri.location}</p>
                      
                      <div className="rating">
                        <span className="stars">★★★★★</span>
                        <span className="rating-text">{nutri.rating} ({nutri.reviews} reviews)</span>
                      </div>
                      
                      <p className="availability">{nutri.available}</p>
                      
                      <div className="languages">
                        <span>Languages: </span>
                        {nutri.languages.join(', ')}
                      </div>
                      
                      <p className="bio">{nutri.bio}</p>
                      
                      <div className="card-actions">
                        <button className="view-profile">View Profile</button>
                        <Link to={`/BookConsultation/${nutri.id}`} className="book-now">
                          Book Consultation
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NutritionistPage;