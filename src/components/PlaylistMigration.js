// Fetch Spotify playlist tracks
export const getSpotifyPlaylistTracks = async (playlistId, token) => {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.items.map(item => ({
      name: item.track.name,
      artist: item.track.artists[0].name,
    }));
  };
  
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  // Search for a track on YouTube
  export const searchYouTubeForTrack = async (track, youtubeToken) => {
    const query = `${track.name} ${track.artist}`;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`
    );
    const data = await response.json();
    return data.items[0]?.id?.videoId; // Get the first video result's ID
  };
  
  // Create a new YouTube playlist
  export const createYouTubePlaylist = async (youtubeToken) => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,status`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${youtubeToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          snippet: {
            title: 'Migrated Spotify Playlist',
            description: 'Playlist migrated from Spotify',
          },
          status: {
            privacyStatus: 'private',
          },
        }),
      }
    );
    const data = await response.json();
    return data.id; // Return the created playlist ID
  };
  
  // Add a track to the YouTube playlist
  export const addTrackToYouTubePlaylist = async (youtubeToken, playlistId, videoId) => {
    await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${youtubeToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          snippet: {
            playlistId: playlistId,
            resourceId: {
              kind: 'youtube#video',
              videoId: videoId,
            },
          },
        }),
      }
    );
  };
  
  // Full migration process from Spotify to YouTube
  export const migrateSpotifyPlaylistToYouTube = async (playlistId) => {
    try {
      const spotifyToken = localStorage.getItem('spotifyToken');
      const youtubeToken = localStorage.getItem('youtubeToken');
  
      // 1. Get Spotify playlist tracks
      const tracks = await getSpotifyPlaylistTracks(playlistId, spotifyToken);
  
      // 2. Create a YouTube playlist
      const youtubePlaylistId = await createYouTubePlaylist(youtubeToken);
  
      // 3. Search and add each track to YouTube playlist
      for (const track of tracks) {
        const videoId = await searchYouTubeForTrack(track, youtubeToken);
        if (videoId) {
          await addTrackToYouTubePlaylist(youtubeToken, youtubePlaylistId, videoId);
        }
      }
      console.log(`Successfully migrated playlist: ${playlistId}`);
    } catch (error) {
      console.error('Error migrating playlist:', error);
    }
  };
  