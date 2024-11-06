const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const app = express();

const CLIENT_ID = 'your-spotify-client-id';
const CLIENT_SECRET = 'your-spotify-client-secret';
const REDIRECT_URI = 'http://localhost:3000/callback';

// Route to handle callback from Spotify and exchange code for tokens
app.get('/callback', async (req, res) => {
    const code = req.query.code || null;

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const { access_token, refresh_token } = response.data;
        // Redirect back to client with tokens as query parameters
        res.redirect(`http://localhost:3000/index?access_token=${access_token}&refresh_token=${refresh_token}`);
    } catch (error) {
        console.error('Error fetching tokens:', error);
        res.send('Authentication failed');
    }
});

// Route to refresh the token
app.get('/refresh_token', async (req, res) => {
    const refresh_token = req.query.refresh_token;

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const { access_token } = response.data;
        res.send({ access_token });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.send('Error refreshing token');
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
