import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/coach_form.css';
import logo from '../assets/images/logo.png'; // Ensure the path to the logo is correct

function CoachProfile() {
  const [formData, setFormData] = useState({
    specialty: '',
    yearsOfExperience: '',
    certifications: '',
    bio: '',
    teachingMethods: '',
    targetAudience: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);  // To prevent multiple submissions
  const navigate = useNavigate();

  // Handle the change of form field values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.specialty || !formData.yearsOfExperience) {
      setError('Specialty and years of experience are required.');
      return;
    }
  
    if (isNaN(formData.yearsOfExperience) || formData.yearsOfExperience <= 0) {
      setError('Please enter a valid number for years of experience.');
      return;
    }
  
    try {
      // Sending the form data to the backend
      const token = localStorage.getItem('token'); // ou sessionStorage.getItem si tu utilises ça

      const response = await fetch('http://localhost:5000/api/coach_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ✅ AJOUT TRÈS IMPORTANT
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Try to parse error message from server
        throw new Error('Failed to submit data: ' + (errorData.message || response.statusText));
      }
  
      // Clear error and redirect after successful form submission
      setError('');
      navigate('/homepage_postloguser');
    } catch (error) {
      setError('Error submitting form: ' + error.message);
    }
  };

  return (
    <div className="coach-profile-container">
      <div className="coach-profile-logo-container">
        <img src={logo} alt="Logo" className="coach-profile-logo" />
      </div>
      <h1 className="coach-profile-header">Coach Form</h1>
      {error && <p className="coach-profile-error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="coach-profile-form">
        <div className="coach-profile-form-group">
          <label htmlFor="specialty" className="coach-profile-label">Specialty</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
            className="coach-profile-input"
          />
        </div>

        <div className="coach-profile-form-group">
          <label htmlFor="yearsOfExperience" className="coach-profile-label">Years of Experience</label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            required
            min="1"
            className="coach-profile-input"
          />
        </div>

        <div className="coach-profile-form-group">
          <label htmlFor="certifications" className="coach-profile-label">Certifications (separated by commas)</label>
          <input
            type="text"
            id="certifications"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            className="coach-profile-input"
          />
        </div>

        <div className="coach-profile-form-group">
          <label htmlFor="bio" className="coach-profile-label">About Me</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="coach-profile-textarea"
          />
        </div>

        <div className="coach-profile-form-group">
          <label htmlFor="teachingMethods" className="coach-profile-label">Teaching Methods</label>
          <input
            type="text"
            id="teachingMethods"
            name="teachingMethods"
            value={formData.teachingMethods}
            onChange={handleChange}
            className="coach-profile-input"
          />
        </div>

        <div className="coach-profile-form-group">
          <label htmlFor="targetAudience" className="coach-profile-label">Target Audience</label>
          <input
            type="text"
            id="targetAudience"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            className="coach-profile-input"
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="coach-profile-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CoachProfile;
