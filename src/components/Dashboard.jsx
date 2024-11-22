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

  // Get the Spotify token from local storage
  useEffect(() => {
    const storedSpotifyToken = localStorage.getItem('spotifyToken');
    if (storedSpotifyToken) {
      setSpotifyToken(storedSpotifyToken);
    }

    const storedYoutubeToken = localStorage.getItem('youtubeToken');
    if (storedYoutubeToken) {
      setYoutubeToken(storedYoutubeToken);
    }
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

  return (
    <div className="h-screen bg-[#081730] flex items-center justify-center">
      {/* Container for the two boxes */}
      <div className="flex space-x-16">
        {/* Left Section: Spotify Login and Playlists */}
        <div className="w-[500px] h-[600px] bg-[#1DB954] flex flex-col items-center justify-center rounded-lg shadow-lg p-6 relative">
          <h1 className="text-4xl text-white font-bold mb-6">Spotify</h1>

          {spotifyToken ? (
            <div className="w-full h-full overflow-y-auto bg-black bg-opacity-70 p-4 rounded-lg">
              <h2 className="text-white text-lg mb-4">Your Playlists</h2>
              {/* Grid layout for playlists */}
              <div className="grid grid-cols-2 gap-4">
                {playlists.length > 0 ? (
                  playlists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="bg-[#282828] bg-opacity-60 hover:bg-opacity-100 transition duration-200 rounded-lg p-4 flex flex-col items-center"
                    >
                      <img
                        src={playlist.images[0]?.url}
                        alt={playlist.name}
                        className="w-full h-32 object-cover rounded"
                      />
                      <a
                        href={playlist.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mt-2 text-center font-semibold hover:underline"
                      >
                        {playlist.name}
                      </a>
                      {/* Migrate Button */}
                      <button
                        className="mt-2 bg-[#1DB954] text-white py-1 px-4 rounded-full hover:bg-[#1ed760] transition duration-200"
                        onClick={() => migrateSpotifyPlaylistToYouTube(playlist.id)}
                      >
                        Migrate
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-white">No playlists found.</p>
                )}
              </div>
              {/* Logout Button */}
              <button
                className="absolute top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-full"
                onClick={handleSpotifyLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="bg-white text-black font-semibold py-2 px-4 rounded-full hover:bg-gray-200 transition duration-200"
              onClick={handleSpotifyLogin}
            >
              Login to Spotify
            </button>
          )}
        </div>

        {/* Right Section: YouTube Playlist Sync */}
        <div className="w-[500px] h-[600px] bg-[#FF0000] flex flex-col items-center justify-center rounded-lg shadow-lg p-6">
          <h1 className="text-4xl text-white mb-6">YouTube</h1>

          {youtubeToken ? (
            <div className="w-full h-full overflow-y-auto bg-white bg-opacity-10 p-4 rounded-lg relative">
              <h2 className="text-white text-lg mb-4">Your YouTube Playlists</h2>
              <div className="grid grid-cols-2 gap-4">
                {youtubePlaylists.length > 0 ? (
                  youtubePlaylists.map((playlist) => (
                    <div key={playlist.id} className="bg-gray-900 bg-opacity-30 rounded-lg p-4 flex flex-col items-center">
                      <img
                        src={playlist.snippet.thumbnails.default.url}
                        alt={playlist.snippet.title}
                        className="w-full h-32 object-cover rounded"
                      />
                      <a
                        href={`https://www.youtube.com/playlist?list=${playlist.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mt-2 text-center hover:underline"
                      >
                        {playlist.snippet.title}
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-white">No YouTube playlists found.</p>
                )}
              </div>
              {/* Logout Button */}
              <button
                className="absolute top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-full"
                onClick={handleYouTubeLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="bg-white text-black py-2 px-4 rounded-full"
              onClick={handleYouTubeLogin}
            >
              Sync YouTube Playlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
