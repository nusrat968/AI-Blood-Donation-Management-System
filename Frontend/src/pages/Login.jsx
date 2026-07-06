import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Login successful!");
        navigate('/dashboard'); 
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Login failed! Please try again.");
      });
  };

  return (
    <div className="login" style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>User Login</h1>
      
      <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div style={{ marginBottom: '15px' }}>
          <input 
            type="email" 
            placeholder="Enter Your Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            style={{ padding: '10px', width: '250px', display: 'block' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input 
            type="password" 
            placeholder="Enter Your Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            style={{ padding: '10px', width: '250px', display: 'block' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer', width: '100%' }}>
          Login
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>Don't have an account? Register Now</p>
    </div>
  );
}

export default Login;