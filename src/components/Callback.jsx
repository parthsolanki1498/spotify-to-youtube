import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from URL hash for both Spotify and YouTube
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    
    const spotifyToken = params.get('access_token');
    const youtubeToken = params.get('access_token'); // YouTube token will also come as access_token

    if (spotifyToken) {
      localStorage.setItem('spotifyToken', spotifyToken); // Store Spotify token
    }
    if (youtubeToken) {
      localStorage.setItem('youtubeToken', youtubeToken); // Store YouTube token
    }

    // Redirect back to the dashboard
    navigate('/');
  }, [navigate]);

  return <div>Redirecting...</div>;
}

export default Callback;
