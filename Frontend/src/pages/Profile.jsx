import React from 'react';

function Profile() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    bloodGroup: "A+",
    location: "Khulna"
  };

  return (
    <div style={{
      padding: '40px 20px',
      backgroundColor: '#f8f9fa',
      minHeight: '80vh',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '450px',
        padding: '35px',
        textAlign: 'center',
        borderTop: '6px solid #e74c3c'
      }}>
        
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#fde9e7',
          color: '#e74c3c',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '32px',
          fontWeight: 'bold',
          margin: '0 auto 20px auto',
          boxShadow: '0 2px 10px rgba(231, 76, 60, 0.1)'
        }}>
          {user.name.charAt(0)}
        </div>

        <h2 style={{ color: '#2c3e50', margin: '0 0 5px 0', fontSize: '24px', fontWeight: 'bold' }}>
          {user.name}
        </h2>
        <p style={{ color: '#7f8c8d', margin: '0 0 25px 0', fontSize: '14px' }}>
          Registered Blood Donor
        </p>

        <div style={{
          textAlign: 'left',
          backgroundColor: '#fcfcfc',
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid #f0f0f0',
          marginBottom: '25px'
        }}>
          <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f5f5f5', paddingBottom: '8px' }}>
            <span style={{ color: '#7f8c8d', fontWeight: '500' }}>Email:</span>
            <span style={{ color: '#2c3e50', fontWeight: 'bold' }}>{user.email}</span>
          </div>
          
          <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f5f5f5', paddingBottom: '8px' }}>
            <span style={{ color: '#7f8c8d', fontWeight: '500' }}>Blood Group:</span>
            <span style={{ color: '#e74c3c', fontWeight: 'bold', backgroundColor: '#fde9e7', padding: '2px 8px', borderRadius: '4px' }}>
              {user.bloodGroup}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#7f8c8d', fontWeight: '500' }}>Location:</span>
            <span style={{ color: '#2c3e50', fontWeight: 'bold' }}>{user.location}</span>
          </div>
        </div>

        <button 
          style={{
            backgroundColor: '#e74c3c',
            color: '#ffffff',
            border: 'none',
            padding: '12px 30px',
            fontSize: '16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            width: '100%',
            boxShadow: '0 4px 10px rgba(231, 76, 60, 0.2)',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
        >
          Edit Profile
        </button>

      </div>
    </div>
  );
}

export default Profile;