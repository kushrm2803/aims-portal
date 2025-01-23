import { handleLogout } from '../utils/auth';
import React from 'react';
import { useRouter } from 'next/router';

const DashboardPage = () => {
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
       <h1>Dashboard</h1>
       <p>This is the dashboard page.</p>
      <a href="/home">Go to Home</a>
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

export default DashboardPage;

