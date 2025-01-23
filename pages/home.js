import { handleLogout } from '../utils/auth';
import React from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();



  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1>Home Page</h1>
      <p>Welcome to the home page! You are logged in.</p>
      <a href="/dashboard">Go to Dashboard</a>
      <a href="/profile">Go to Profile</a>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;

