import React, { useState, useEffect } from 'react';
import { migrateSpotifyPlaylistToYouTube } from './PlaylistMigration';

// Spotify and YouTube OAuth and API Configuration from .env
const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const SPOTIFY_API_BASE_URL = process.env.REACT_APP_SPOTIFY_API_BASE_URL;
const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${SPOTIFY_REDIRECT_URI}&scope=user-read-private%20playlist-read-private%20playlist-read-collaborative`;

const YOUTUBE_CLIENT_ID = process.env.REACT_APP_YOUTUBE_CLIENT_ID;
const YOUTUBE_REDIRECT_URI = process.env.REACT_APP_YOUTUBE_REDIRECT_URI;
const YOUTUBE_API_BASE_URL = process.env.REACT_APP_YOUTUBE_API_BASE_URL;
const YOUTUBE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.readonly&redirect_uri=${YOUTUBE_REDIRECT_URI}&response_type=token&client_id=${YOUTUBE_CLIENT_ID}`;

function Dashboard() {
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [youtubeToken, setYoutubeToken] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [youtubePlaylists, setYoutubePlaylists] = useState([]);
  const [migratedPlaylists, setMigratedPlaylists] = useState([]);

  // Get the Spotify token and migrated playlists from local storage
  useEffect(() => {
    const storedSpotifyToken = localStorage.getItem('spotifyToken');
    if (storedSpotifyToken) {
      setSpotifyToken(storedSpotifyToken);
    }

    const storedYoutubeToken = localStorage.getItem('youtubeToken');
    if (storedYoutubeToken) {
      setYoutubeToken(storedYoutubeToken);
    }

    const storedMigratedPlaylists = JSON.parse(localStorage.getItem('migratedPlaylists')) || [];
    setMigratedPlaylists(storedMigratedPlaylists);
  }, []);

  // Fetch the user's Spotify playlists
  useEffect(() => {
    if (spotifyToken) {
      fetch(`${SPOTIFY_API_BASE_URL}/me/playlists`, {
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setPlaylists(data.items || []); // Set Spotify playlists in state
        })
        .catch((error) => {
          console.error('Error fetching Spotify playlists:', error);
        });
    }
  }, [spotifyToken]);

  // Fetch YouTube playlists
  useEffect(() => {
    if (youtubeToken) {
      fetch(`${YOUTUBE_API_BASE_URL}/playlists?part=snippet&mine=true`, {
        headers: {
          Authorization: `Bearer ${youtubeToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setYoutubePlaylists(data.items || []); // Set YouTube playlists in state
        })
        .catch((error) => {
          console.error('Error fetching YouTube playlists:', error);
        });
    }
  }, [youtubeToken]);

  // Function to handle Spotify login
  const handleSpotifyLogin = () => {
    window.location.href = SPOTIFY_AUTH_URL; // Redirect to Spotify login
  };

  // Function to handle YouTube login
  const handleYouTubeLogin = () => {
    window.location.href = YOUTUBE_AUTH_URL; // Redirect to YouTube login
  };

  // Function to handle Spotify logout
  const handleSpotifyLogout = () => {
    setSpotifyToken(null); // Clear the token state
    setPlaylists([]); // Clear playlists state
    localStorage.removeItem('spotifyToken'); // Remove token from local storage
  };

  // Function to handle YouTube logout
const handleYouTubeLogout = () => {
  setYoutubeToken(null); // Clear YouTube token
  setYoutubePlaylists([]); // Clear YouTube playlists
  localStorage.removeItem('youtubeToken'); // Remove token from local storage
};