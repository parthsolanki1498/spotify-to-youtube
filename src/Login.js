// src/Login.js
import React from 'react';
import './Login.css';

function Login({ onGoogleLogin }) {
  return (
    <div className="login-container">
      <h1>Login to YouTube</h1>

      {/* Google Login Button */}
      <button onClick={onGoogleLogin} className="login-btn google-btn">
        Login with Google
      </button>
    </div>
  );
}

export default Login;
