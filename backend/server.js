// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS

const CLIENT_ID = 'ccc7fb8ee2ea4e37bb027f290228395c'; // Your Client ID
const REDIRECT_URI = 'http://localhost:3000/callback/spotify'; // Your Redirect URI

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Enable JSON body parsing

// Exchange authorization code for access and refresh tokens
app.post('/get_tokens', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    }).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('Tokens received and sent to client'); // Log when tokens are successfully obtained
    res.json({
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token
    });
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).json({ error: 'Failed to get tokens' });
  }
});

// Refresh access token using the refresh token
app.post('/refresh_token', async (req, res) => {
  const { refresh_token } = req.body;

  console.log('Received request to refresh token'); // Log when refresh is requested

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    }).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('Token refreshed successfully'); // Log when refresh is successful
    res.json({
      access_token: response.data.access_token
    });
  } catch (error) {
    console.error('Error refreshing access token:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
