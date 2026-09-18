import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    blood_group: '',
    district: '',
    age: '',
    weight: '',
    gender: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Sending form data to backend API
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        setShowPopup(true);
      })
      .catch((err) => {
        console.error("Registration error:", err);
        alert("Registration failed! Please try again.");
      });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="login" style={{ position: 'relative' }}>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />

        <select name="blood_group" onChange={handleChange} required>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <input type="text" name="district" placeholder="District" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age (Minimum 18)" onChange={handleChange} required />
        <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} required />

        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">Register</button>
      </form>

      {showPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '30px 40px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            maxWidth: '400px',
            width: '90%'
          }}>
            <div style={{
              fontSize: '50px',
              color: '#2ecc71',
              marginBottom: '15px'
            }}>
              ✓
            </div>
            <h2 style={{ color: '#333', margin: '0 0 10px 0', fontSize: '24px' }}>
              Registration Successful!
            </h2>
            <p style={{ color: '#666', margin: '0 0 20px 0', fontSize: '16px' }}>
              Your account has been created successfully.
            </p>
            <button 
              onClick={closePopup}
              style={{
                backgroundColor: '#2ecc71',
                color: 'white',
                border: 'none',
                padding: '10px 25px',
                fontSize: '16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;