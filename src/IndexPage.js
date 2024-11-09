// src/IndexPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IndexPage.css';
import { useGoogleLogin } from '@react-oauth/google';

const CLIENT_ID = 'ccc7fb8ee2ea4e37bb027f290228395c'; // Your Spotify Client ID
const REDIRECT_URI = 'http://localhost:3000/callback/spotify'; // Your Spotify Redirect URI
const SCOPES = 'playlist-read-private playlist-modify-private';

function IndexPage() {
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
  const [youtubeToken, setYouTubeToken] = useState(null);
  const [youtubePlaylists, setYouTubePlaylists] = useState([]);
  const [youtubePlaylistSynced, setYouTubePlaylistSynced] = useState(false);

  // Spotify login redirect
  const handleSpotifyLogin = () => {
    const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
    window.location.href = AUTH_URL;
  };

  // Extract Spotify authorization code from URL and exchange for access token
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
      axios.post('http://localhost:3001/get_tokens', { code: authorizationCode })
        .then(response => {
          const { access_token, refresh_token } = response.data;
          setSpotifyToken(access_token);
          localStorage.setItem('spotifyRefreshToken', refresh_token); // Store refresh token
          console.log('Spotify access token obtained and stored');
        })
        .catch(error => {
          console.error('Error exchanging code for Spotify tokens:', error);
        });
    }
  }, []);

  // Function to refresh Spotify access token
  const refreshAccessToken = async () => {
    console.log('Attempting to send Spotify refresh request to backend'); // Log when attempting to refresh token

    const refreshToken = localStorage.getItem('spotifyRefreshToken');
    if (refreshToken) {
      try {
        const response = await axios.post('http://localhost:3001/refresh_token', { refresh_token: refreshToken });
        const { access_token } = response.data;
        setSpotifyToken(access_token);
        console.log('Spotify token refreshed and set in state'); // Log when token is refreshed and set
      } catch (error) {
        console.error('Error refreshing Spotify access token:', error);
      }
    }
  };

  // Refresh Spotify token every 1 minute for testing
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 60 * 1000); // Refresh every 1 minute (60000 ms)

    return () => clearInterval(interval);
  }, []);

  // Fetch Spotify playlists when token is available
  useEffect(() => {
    if (spotifyToken) {
      axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${spotifyToken}`
        }
      })
      .then(response => {
        setSpotifyPlaylists(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching Spotify playlists:', error);
      });
    }
  }, [spotifyToken]);

  // YouTube login to get YouTube token
  const handleYouTubeLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setYouTubeToken(tokenResponse.access_token);
      console.log('YouTube access token obtained and stored');
    },
    onError: () => console.log('Google Login Failed'),
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
  });

  // Sync YouTube playlists
  const handleYouTubeSync = async () => {
    if (youtubeToken) {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
          headers: {
            Authorization: `Bearer ${youtubeToken}`
          },
          params: {
            part: 'snippet',
            mine: true
          }
        });
        setYouTubePlaylists(response.data.items);
        setYouTubePlaylistSynced(true);
        console.log('YouTube playlists synced successfully');
      } catch (error) {
        console.error('Error fetching YouTube playlists:', error);
      }
    }
  };

  return (
    <div className="index-container">
      <h1>Welcome to Spotify and YouTube Sync</h1>
      
      {/* Spotify Login Button */}
      <button onClick={handleSpotifyLogin} className="login-btn spotify-btn">
        Login with Spotify
      </button>

      {/* YouTube Login Button */}
      <button onClick={handleYouTubeLogin} className="login-btn youtube-btn">
        Login with YouTube
      </button>

      {/* Sync YouTube Playlist Button */}
      {youtubeToken && (
        <button onClick={handleYouTubeSync} className="sync-btn youtube-btn">
          Sync YouTube Playlist
        </button>
      )}

      {/* Spotify Playlists */}
      {spotifyToken && spotifyPlaylists.length > 0 && (
        <div className="playlist-section">
          <h2>Your Spotify Playlists</h2>
          <ul>
            {spotifyPlaylists.map((playlist) => (
              <li key={playlist.id}>{playlist.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* YouTube Playlists */}
      {youtubePlaylistSynced && youtubePlaylists.length > 0 && (
        <div className="playlist-section">
          <h2>Your YouTube Playlists</h2>
          <ul>
            {youtubePlaylists.map((playlist) => (
              <li key={playlist.id}>{playlist.snippet.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default IndexPage;
