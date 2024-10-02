// src/App.js
import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './App.css';

const spotifyApi = new SpotifyWebApi();

function App() {
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [youtubeToken, setYouTubeToken] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [youtubePlaylistUrl, setYouTubePlaylistUrl] = useState('');

  // Function to handle Spotify Login and fetch token
  const handleSpotifyLogin = () => {
    const CLIENT_ID = 'your-spotify-client-id';
    const REDIRECT_URI = 'http://localhost:3000/callback'; // Set this in Spotify developer dashboard
    const SCOPES = 'playlist-read-private';
    const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=7bda4a5c09644c0392a0dc27abfa5056&response_type=token&redirect_uri=http://localhost:3000/callback&scope=playlist-read-private';

    window.location.href = AUTH_URL;
  };

  useEffect(() => {
    // Get Spotify token from URL hash after redirect
    const hash = window.location.hash;
    if (hash) {
      const token = hash.split('&')[0].split('=')[1];
      setSpotifyToken(token);
      spotifyApi.setAccessToken(token);
      window.location.hash = '';
    }
  }, []);

  // Function to handle Google Login for YouTube API access using @react-oauth/google
  const handleYouTubeLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => setYouTubeToken(tokenResponse.access_token),
    onError: () => console.log('Login Failed'),
  });

  // Fetch Spotify playlists after login
  useEffect(() => {
    if (spotifyToken) {
      spotifyApi.getUserPlaylists().then(response => {
        setPlaylists(response.items);
      });
    }
  }, [spotifyToken]);

  // Search for a song on YouTube by its track name and artist
  const searchYouTube = async (track) => {
    const query = `${track.name} ${track.artists[0].name}`;
    const YOUTUBE_API_KEY = 'your-youtube-api-key';
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${YOUTUBE_API_KEY}`
    );
    return response.data.items[0]; // Get the first video result
  };

  // Create a new YouTube playlist
  const createYouTubePlaylist = async (title) => {
    const response = await axios.post(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,status`,
      {
        snippet: {
          title: title,
          description: 'Migrated from Spotify',
        },
        status: {
          privacyStatus: 'public',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${youtubeToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.id;
  };

  // Add a YouTube video to the playlist
  const addToYouTubePlaylist = async (playlistId, videoId) => {
    await axios.post(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet`,
      {
        snippet: {
          playlistId: playlistId,
          resourceId: {
            videoId: videoId,
            kind: 'youtube#video',
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${youtubeToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  };

  // Migrate a playlist from Spotify to YouTube
  const migratePlaylist = async (playlistId) => {
    const playlistTracks = await spotifyApi.getPlaylistTracks(playlistId);
    const youtubePlaylistId = await createYouTubePlaylist('Migrated Playlist');

    for (const item of playlistTracks.items) {
      const video = await searchYouTube(item.track);
      await addToYouTubePlaylist(youtubePlaylistId, video.id.videoId);
    }
    setYouTubePlaylistUrl(`https://www.youtube.com/playlist?list=${youtubePlaylistId}`);
  };

  return (
    <GoogleOAuthProvider clientId="your-google-client-id">
      <div className="App">
        <h1>Spotify to YouTube Playlist </h1>
        
        {/* Buttons to log in to Spotify and YouTube */}
        <button onClick={handleSpotifyLogin}>Login to Spotify</button>
        <button onClick={handleYouTubeLogin}>Login to YouTube</button>

        {/* Display list of Spotify playlists */}
        <div className="playlists">
          {playlists.map(playlist => (
            <div key={playlist.id}>
              <p>{playlist.name}</p>
              <button onClick={() => migratePlaylist(playlist.id)}>Migrate to YouTube</button>
            </div>
          ))}
        </div>

        {/* Link to migrated YouTube playlist */}
        {youtubePlaylistUrl && <p>Playlist migrated: <a href={youtubePlaylistUrl}>View on YouTube</a></p>}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
