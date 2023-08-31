const express = require('express');
const router = express.Router();

const config = require('../../config');

// Import Functions
const getAccessToken = require('../functions/getAccessToken');
const getUserDetails = require('../functions/getUserDetails');

router.get('/', async (req, res) => {
    const code = req.query?.code;

    // If Code is undefined redirect to Discord OAuth2
    if (!code) return res.redirect(config.server.discordurl)

    // Get Access Token & Refresh Token from Code
    const { access_token, refresh_token } = await getAccessToken(code);

    // If access_token is undefined redirect to Discord OAuth2 -> its undefined if an Error Occures (code is invalid for example)
    if (!access_token) return res.redirect(config.server.discordurl)

    const user = await getUserDetails(access_token);

    console.log(user)

    // Testing Response
    res.json(
        user
    )
});

module.exports = router;