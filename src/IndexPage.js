// src/IndexPage.js
import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios'; // We'll use Axios for API requests
import './IndexPage.css';
import { useGoogleLogin } from '@react-oauth/google';

const spotifyApi = new SpotifyWebApi();

function IndexPage() {
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
  const [youtubeToken, setYouTubeToken] = useState(null);
  const [youtubePlaylists, setYouTubePlaylists] = useState([]);
  const [youtubePlaylistSynced, setYouTubePlaylistSynced] = useState(false);

  // Handle Spotify login and fetching playlists
  const handleSpotifyLogin = () => {
    const CLIENT_ID = 'your-spotify-client-id';
    const REDIRECT_URI = 'http://localhost:3000/index'; // Replace with actual redirect URI
    const SCOPES = 'playlist-read-private playlist-modify-private';
    const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=7bda4a5c09644c0392a0dc27abfa5056&response_type=token&redirect_uri=http://localhost:3000/callback&scope=playlist-read-private';    window.location.href = AUTH_URL;
  };

  // Extract Spotify token from the URL (when redirected back)
  useEffect(() => {
    const hash = window.location.hash;
    let token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token="));
    if (token) {
      token = token.split("=")[1];
      setSpotifyToken(token);
      spotifyApi.setAccessToken(token);
      fetchSpotifyPlaylists();
    }
  }, []);

  // Fetch Spotify playlists using the Spotify API
  const fetchSpotifyPlaylists = async () => {
    if (spotifyToken) {
      const response = await spotifyApi.getUserPlaylists();
      setSpotifyPlaylists(response.items);
    }
  };

  // Function to handle YouTube playlist sync (real data from API)
  const handleYouTubeSync = async () => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/playlists', 
        {
          headers: {
            Authorization: `Bearer ${youtubeToken}`,
          },
          params: {
            part: 'snippet',
            mine: true, // Get user's own playlists
          }
        }
      );
      setYouTubePlaylists(response.data.items); // Set playlists from response
      setYouTubePlaylistSynced(true);
    } catch (error) {
      console.error('Error fetching YouTube playlists:', error);
    }
  };

  // Google login to get YouTube token
  const handleYouTubeLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setYouTubeToken(tokenResponse.access_token);
    },
    onError: () => console.log('Google Login Failed'),
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
  });

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
