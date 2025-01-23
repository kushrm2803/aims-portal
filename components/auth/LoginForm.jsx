import React, { useState } from 'react';

const LoginForm = ({ onNext }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.endsWith('@iitrpr.ac.in')) {
      setError('Please use a valid IIT Ropar email address.');
      return;
    }
  
    try {
      const response = await fetch('/api/auth/sendOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setError('');
        onNext(email);
        alert(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to send OTP. Please try again later.');
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
            fontSize: '2rem',
            fontWeight: '600',
            marginBottom: '2rem',
            color: '#333',
          }}
        >
          AIMS Portal
        </h1>
        <div
          style={{
            marginBottom: '1.5rem',
            textAlign: 'left',
          }}
        >
          <label
            htmlFor="email"
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#555',
            }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            boxSizing: 'border-box'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#333')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#000')}
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
