import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/auth/Header';
import LoginForm from '../components/auth/LoginForm';
import OTPForm from '../components/auth/OTPForm';
import LogoutMessage from '../components/auth/LogoutMessage'; // Import the new LogoutMessage component

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [logoutMessage, setLogoutMessage] = useState('');
  const router = useRouter();

  // Handle OTP and email verification flow
  const handleNext = (enteredEmail) => {
    setEmail(enteredEmail);
    setStep(2);
  };

  const handleVerify = () => {
    // Simulate successful OTP verification and redirect
    console.log('User verified, now redirecting to dashboard...');
    router.push('/dashboard');
  };

  // Handle logout message from query params
  useEffect(() => {
    if (router.query.logout === 'success') {
      setLogoutMessage('You have been logged out successfully.');
      // Remove the query parameter from the URL without a full reload
      router.replace('/', undefined, { shallow: true });
    }
  }, [router.query.logout]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Ensures that the entire height is used and there's no scrolling.
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',  // Avoid scroll bar if unnecessary.
      }}
    >
      <Header />
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          textAlign: 'center',
          paddingTop: logoutMessage ? '30px' : '0', // Add some top padding if logout message is shown.
        }}
      >
        {/* Show the LogoutMessage component */}
        <LogoutMessage message={logoutMessage} />
        
        {step === 1 ? (
          <LoginForm onNext={handleNext} />
        ) : (
          <OTPForm onVerify={handleVerify} email={email} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
