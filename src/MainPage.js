// src/MainPage.js
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const navigate = useNavigate();

  // Google login function
  const googleLogin = useGoogleLogin({
    onSuccess: () => {
      // Redirect to the index page after successful login
      navigate('/index');
    },
    onError: () => console.log('Google Login Failed'),
  });

  return (
    <div className="main-container">
      <h1>Login with Google</h1>
      <button onClick={googleLogin} className="login-btn google-btn">
        Login with Google
      </button>
    </div>
  );
}

export default MainPage;
