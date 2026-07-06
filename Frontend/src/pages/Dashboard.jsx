import React, { useState, useEffect } from 'react';

function Dashboard() {
  // ডাটাবেজ থেকে ডাটা আসার আগে এগুলো ডিফল্ট হিসেবে থাকবে
  const [totalDonors, setTotalDonors] = useState(0);
  const [bloodRequests, setBloodRequests] = useState(0);
  const [availableGroups, setAvailableGroups] = useState(["A+", "B+", "O+", "AB+"]);

  useEffect(() => {
    // বন্ধুর দেওয়া ড্যাশবোর্ড লিংক থেকে ডাটা আনা হচ্ছে
    fetch("http://localhost:5000/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        // যদি ডাটাবেজে সঠিক ডাটা থাকে, তবে এখানে সেট হবে
        if (data) {
          setTotalDonors(data.totalDonors || 0);
          setBloodRequests(data.bloodRequests || 0);
          if (data.availableGroups) {
            setAvailableGroups(data.availableGroups);
          }
        }
      })
      .catch((err) => console.error("Error fetching dashboard data:", err));
  }, []);

  return (
    <div style={{
      padding: '40px 20px',
      backgroundColor: '#f8f9fa',
      minHeight: '80vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#2c3e50', margin: '0 0 10px 0', fontSize: '32px', fontWeight: 'bold' }}>
          Dashboard
        </h1>
        <p style={{ color: '#7f8c8d', margin: 0, fontSize: '16px' }}>
          Welcome to AI Blood Donation Management System
        </p>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '25px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '25px',
          width: '280px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderLeft: '5px solid #e74c3c',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#7f8c8d', margin: '0 0 15px 0', fontSize: '18px', fontWeight: '600' }}>
            Total Donors
          </h3>
          <p style={{ color: '#2c3e50', margin: 0, fontSize: '36px', fontWeight: 'bold' }}>
            {totalDonors}
          </p>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '25px',
          width: '280px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderLeft: '5px solid #34495e',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#7f8c8d', margin: '0 0 15px 0', fontSize: '18px', fontWeight: '600' }}>
            Blood Requests
          </h3>
          <p style={{ color: '#e74c3c', margin: 0, fontSize: '36px', fontWeight: 'bold' }}>
            {bloodRequests}
          </p>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '25px',
          width: '280px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderLeft: '5px solid #2ecc71',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#7f8c8d', margin: '0 0 15px 0', fontSize: '18px', fontWeight: '600' }}>
            Available Blood Groups
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: '10px'
          }}>
            {availableGroups.map((group, index) => (
              <span key={index} style={{
                backgroundColor: '#fde9e7',
                color: '#e74c3c',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: '1px solid #fbc4be'
              }}>
                {group}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;