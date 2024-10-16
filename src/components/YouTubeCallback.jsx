import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const YouTubeCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const tokenFromHash = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];

      if (tokenFromHash) {
        localStorage.setItem('youtubeToken', tokenFromHash);
        navigate('/dashboard'); // Redirect to your dashboard
      }
    }
  }, [navigate]);

  return <div>Loading YouTube...</div>;
};

export default YouTubeCallback;
