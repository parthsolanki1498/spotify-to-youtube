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
          setPlaylists(data.items || []);
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
          setYoutubePlaylists(data.items || []);
        })
        .catch((error) => {
          console.error('Error fetching YouTube playlists:', error);
        });
    }
  }, [youtubeToken]);

  // Function to handle Spotify login
  const handleSpotifyLogin = () => {
    window.location.href = SPOTIFY_AUTH_URL;
  };

  // Function to handle YouTube login
  const handleYouTubeLogin = () => {
    window.location.href = YOUTUBE_AUTH_URL;
  };

  // Function to handle Spotify logout
  const handleSpotifyLogout = () => {
    setSpotifyToken(null);
    setPlaylists([]);
    localStorage.removeItem('spotifyToken');
  };

  // Function to handle YouTube logout
  const handleYouTubeLogout = () => {
    setYoutubeToken(null);
    setYoutubePlaylists([]);
    localStorage.removeItem('youtubeToken');
  };

  // Handle migration from Spotify to YouTube
  const handleMigration = async (spotifyPlaylistId) => {
    try {
      const migrated = await migrateSpotifyPlaylistToYouTube(spotifyPlaylistId, youtubeToken);
      setMigratedPlaylists((prev) => [...prev, migrated]);
      localStorage.setItem('migratedPlaylists', JSON.stringify([...migratedPlaylists, migrated]));
    } catch (error) {
      console.error('Error migrating playlist:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Spotify Login/Logout */}
      {!spotifyToken ? (
        <button onClick={handleSpotifyLogin}>Login to Spotify</button>
      ) : (
        <button onClick={handleSpotifyLogout}>Logout of Spotify</button>
      )}

      {/* YouTube Login/Logout */}
      {!youtubeToken ? (
        <button onClick={handleYouTubeLogin}>Login to YouTube</button>
      ) : (
        <button onClick={handleYouTubeLogout}>Logout of YouTube</button>
      )}

      {/* Display Spotify Playlists */}
      <h2>Spotify Playlists</h2>
      {playlists.length === 0 ? (
        <p>No Spotify playlists found</p>
      ) : (
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              {playlist.name} <button onClick={() => handleMigration(playlist.id)}>Migrate to YouTube</button>
            </li>
          ))}
        </ul>
      )}

      {/* Display YouTube Playlists */}
      <h2>YouTube Playlists</h2>
      {youtubePlaylists.length === 0 ? (
        <p>No YouTube playlists found</p>
      ) : (
        <ul>
          {youtubePlaylists.map((playlist) => (
            <li key={playlist.id}>{playlist.snippet.title}</li>
          ))}
        </ul>
      )}

      {/* Display Migrated Playlists */}
      <h2>Migrated Playlists</h2>
      {migratedPlaylists.length === 0 ? (
        <p>No playlists have been migrated</p>
      ) : (
        <ul>
          {migratedPlaylists.map((playlist, index) => (
            <li key={index}>{playlist.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
