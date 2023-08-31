const express = require('express');
const router = express.Router();

const config = require('../../config');

const getAccessToken = require('../functions/getAccessToken');

router.get('/', async (req, res) => {
    const code = req.query?.code;

    // If Code is undefined redirect to Discord OAuth2
    if (!code) return res.redirect(config.server.discordurl)

    // Get Access Token & Refresh Token from Code
    const { access_token, refresh_token } = await getAccessToken(code);

    // If access_token is undefined redirect to Discord OAuth2 -> its undefined if an Error Occures (code is invalid for example)
    if (!access_token) return res.redirect(config.server.discordurl)


    // Testing Response
    res.json({
        status: "OK",
        message: "Authorizing or something idk"
    })
});

module.exports = router;