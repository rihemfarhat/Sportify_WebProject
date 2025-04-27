import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/BookConsultation.css';

const nutritionistData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Weight Management",
    image: "nutritionist1.jpg",
    availableSlots: [
      { date: "2023-06-15", time: "09:00", type: "Video" },
      { date: "2023-06-15", time: "11:00", type: "In-person" },
      { date: "2023-06-16", time: "14:00", type: "Video" },
      { date: "2023-06-17", time: "10:00", type: "Video" },
    ],
    consultationTypes: [
      { type: "Initial Consultation", duration: "60 min", price: "$120" },
      { type: "Follow-up", duration: "30 min", price: "$75" },
      { type: "Meal Plan Review", duration: "45 min", price: "$90" },
    ],
    location: "123 Wellness St, New York, NY",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Sports Nutrition",
    image: "nutritionist2.jpg",
    availableSlots: [
      { date: "2023-06-15", time: "13:00", type: "Video" },
      { date: "2023-06-16", time: "09:30", type: "In-person" },
      { date: "2023-06-16", time: "16:00", type: "Video" },
    ],
    consultationTypes: [
      { type: "Initial Consultation", duration: "90 min", price: "$150" },
      { type: "Athlete Assessment", duration: "60 min", price: "$120" },
      { type: "Performance Review", duration: "45 min", price: "$95" },
    ],
    location: "456 Fitness Ave, Los Angeles, CA",
    rating: 4.9,
  },
];

const BookConsultation = () => {
  const { nutritionistId } = useParams();
  const navigate = useNavigate();
  const [nutritionist, setNutritionist] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goals: '',
    dietaryRestrictions: '',
  });
  const [step, setStep] = useState(1); // 1: Select slot, 2: Select consultation, 3: Form, 4: Confirmation
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundNutritionist = nutritionistData.find(
        (n) => n.id === parseInt(nutritionistId)
      );
      setNutritionist(foundNutritionist);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [nutritionistId]);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setStep(2);
  };

  const handleConsultationSelect = (consultation) => {
    setSelectedConsultation(consultation);
    setStep(3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 1000);
  };

  if (isLoading && !nutritionist) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading nutritionist details...</p>
      </div>
    );
  }

  if (!nutritionist) {
    return (
      <div className="not-found">
        <h2>Nutritionist not found</h2>
        <p>We couldn't find the nutritionist you're looking for.</p>
        <button onClick={() => navigate('/NutritionistPage')}>
          Back to Nutritionists
        </button>
      </div>
    );
  }

  return (
    <div className="book-consultation-container">
      <div className="breadcrumbs">
        <button 
          onClick={() => navigate(-1)} 
          className="back-button"
        >
          &larr; Back
        </button>
        <span>Step {step} of 4</span>
      </div>

      <div className="nutritionist-header">
        <img
          src={require(`../assets/images/${nutritionist.image}`)}
          alt={nutritionist.name}
          className="nutritionist-image"
        />
        <div className="nutritionist-info">
          <h2>{nutritionist.name}</h2>
          <p className="specialty">{nutritionist.specialty}</p>
          <div className="rating">
            <span className="stars">★★★★★</span>
            <span>{nutritionist.rating}</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="step-container">
          <h3>Select Available Time Slot</h3>
          <div className="time-slots">
            {nutritionist.availableSlots.map((slot, index) => (
              <div
                key={index}
                className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                onClick={() => handleSlotSelect(slot)}
              >
                <div className="slot-date">{slot.date}</div>
                <div className="slot-time">{slot.time}</div>
                <div className="slot-type">{slot.type}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="step-container">
          <h3>Select Consultation Type</h3>
          <div className="consultation-types">
            {nutritionist.consultationTypes.map((type, index) => (
              <div
                key={index}
                className={`consultation-type ${selectedConsultation === type ? 'selected' : ''}`}
                onClick={() => handleConsultationSelect(type)}
              >
                <h4>{type.type}</h4>
                <p>Duration: {type.duration}</p>
                <p>Price: {type.price}</p>
              </div>
            ))}
          </div>
          <button
            className="back-button"
            onClick={() => setStep(1)}
          >
            Back to Time Slots
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="step-container">
          <h3>Your Appointment Details</h3>
          <div className="appointment-summary">
            <p>
              <strong>Date:</strong> {selectedSlot.date} at {selectedSlot.time}
            </p>
            <p>
              <strong>Type:</strong> {selectedConsultation.type} ({selectedConsultation.duration})
            </p>
            <p>
              <strong>Price:</strong> {selectedConsultation.price}
            </p>
            <p>
              <strong>Location:</strong> {selectedSlot.type === 'In-person' ? nutritionist.location : 'Video Call'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            <h4>Personal Information</h4>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="goals">Health Goals</label>
              <textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                placeholder="What are your main health and nutrition goals?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dietaryRestrictions">Dietary Restrictions</label>
              <textarea
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                placeholder="Any allergies, intolerances, or dietary preferences?"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="back-button"
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button type="submit" className="submit-button">
                {isLoading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 4 && (
        <div className="confirmation-container">
          <div className="confirmation-icon">✓</div>
          <h3>Appointment Booked Successfully!</h3>
          <div className="confirmation-details">
            <p>
              <strong>Nutritionist:</strong> {nutritionist.name}
            </p>
            <p>
              <strong>Date & Time:</strong> {selectedSlot.date} at {selectedSlot.time}
            </p>
            <p>
              <strong>Consultation:</strong> {selectedConsultation.type}
            </p>
            <p>
              <strong>Location:</strong> {selectedSlot.type === 'In-person' ? nutritionist.location : 'Video Call'}
            </p>
            <p>
              A confirmation has been sent to <strong>{formData.email}</strong>
            </p>
          </div>

          <div className="confirmation-actions">
            <button
              onClick={() => navigate('/')}
              className="home-button"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate('/my-appointments')}
              className="appointments-button"
            >
              View My Appointments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookConsultation;