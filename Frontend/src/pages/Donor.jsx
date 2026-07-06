import React, { useState, useEffect } from 'react';

function Donor() {
  // শুরুতে ডামি ডাটা হিসেবে তোমার আগের ৩টি নামই রাখলাম, ব্যাকএন্ড থেকে ডাটা আসলে এগুলো রিপ্লেস হয়ে যাবে
  const [donors, setDonors] = useState([
    { name: "Rahim", bloodGroup: "A+", location: "Khulna" },
    { name: "Karim", bloodGroup: "O+", location: "Mongla" },
    { name: "Sadia", bloodGroup: "B+", location: "Bagerhat" }
  ]);

  useEffect(() => {
    // বন্ধুর দেওয়া ডোনার লিস্টের লিংকে হিট করা হচ্ছে
    fetch("http://localhost:5000/api/donors")
      .then((res) => res.json())
      .then((data) => {
        // যদি ব্যাকএন্ড থেকে ডোনারদের কোনো অ্যারে (List) আসে, তবে তা সেট হবে
        if (Array.isArray(data)) {
          setDonors(data);
        } else if (data && Array.isArray(data.donors)) {
          // কিছু ক্ষেত্রে ব্যাকএন্ড ডাটা { donors: [...] } আকারে পাঠায়, সেটার সেফটি চেক
          setDonors(data.donors);
        }
      })
      .catch((err) => console.error("Error fetching donors data:", err));
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
          Available Blood Donors
        </h1>
        <p style={{ color: '#7f8c8d', margin: 0, fontSize: '16px' }}>
          Find and contact nearby life-savers
        </p>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {donors.map((donor, index) => (
          <div key={index} style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '20px',
            width: '280px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            border: '1px solid #eaeded',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '4px',
              backgroundColor: '#e74c3c'
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ color: '#2c3e50', margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
                {donor.name}
              </h3>
              <span style={{
                backgroundColor: '#e74c3c',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                boxShadow: '0 2px 5px rgba(231, 76, 60, 0.3)'
              }}>
                {donor.bloodGroup}
              </span>
            </div>

            <div style={{ color: '#7f8c8d', fontSize: '14px', marginBottom: '15px' }}>
              <p style={{ margin: '0 0 5px 0' }}>
                <strong>Location:</strong> {donor.location}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Availability:</strong> Available
              </p>
            </div>

            <button style={{
              backgroundColor: '#ffffff',
              color: '#e74c3c',
              border: '1px solid #e74c3c',
              padding: '8px 0',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              width: '100%'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#e74c3c';
              e.target.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#e74c3c';
            }}>
              Contact Donor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Donor;