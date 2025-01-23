import React, { useState } from 'react';
import { useRouter } from 'next/router';


const OTPForm = ({ onVerify ,email}) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Basic OTP validation
    if (!otp || otp.length !== 6 || isNaN(otp)) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
  
    try {
      const response = await fetch('/api/auth/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',  // Ensures cookies are sent and received
        body: JSON.stringify({ email, otp }),
      });
  
      console.log(email, otp);
  
      const data = await response.json();
      console.log('Response:', data);

  
      if (response.ok) {
        alert(data.message);
        router.push('/home'); 
        // onVerify();  // Call the callback function on successful verification
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('Failed to verify OTP. Please try again.');
    }
  };
  
  

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '3rem',
          borderRadius: '15px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
          width: '100%',
          maxWidth: '300px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            color: '#333',
          }}
        >
          Verify OTP
        </h1>
        <div
          style={{
            marginBottom: '1.5rem',
            textAlign: 'left',
          }}
        >
          <label
            htmlFor="otp"
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#555',
            }}
          >
            OTP
          </label>
          <input
            id="otp"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              padding: '0.8rem',
              fontSize: '1rem',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>
        {error && (
          <div
            style={{
              color: 'red',
              fontSize: '0.9rem',
              marginBottom: '1rem',
            }}
          >
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            padding: '0.8rem 1rem',
            fontSize: '1rem',
            borderRadius: '8px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#333')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#000')}
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OTPForm;
