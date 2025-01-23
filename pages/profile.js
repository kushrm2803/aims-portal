import { handleLogout } from '../utils/auth';
import React from 'react';
import { useRouter } from 'next/router';

const ProfilePage = () => {
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
         <h1>Profile Page</h1>
         <p>This is your profile page.</p>
      <a href="/home">Go to Home Page</a>
      <a href="/dashboard">Go to Dashboard</a>

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

export default ProfilePage;

