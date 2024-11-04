// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Replace 'your-google-client-id' with your actual client ID
const CLIENT_ID = 'your-google-client-id';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='58828607586-11mjfitfi4hc8u68hdslqb9aji0rtd5e.apps.googleusercontent.com'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
