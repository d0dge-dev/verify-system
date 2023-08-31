const express = require('express');
const router = express.Router();

const config = require('../../config');

// Import Functions
const getAccessToken = require('../functions/getAccessToken');
const getUserDetails = require('../functions/getUserDetails');
const getUserLocation = require('../functions/getUserLocation');

router.get('/', async (req, res) => {
    // check if device is mobile if so block it becuase if its used with mobile hotspot it will show a wrong location
    const userAgent = req.headers['user-agent'];
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    if (isMobile) return res.send("Mobile Devices are not supported yet")

    // Check if Code is in URL
    const code = req.query?.code;

    // If Code is undefined redirect to Discord OAuth2
    if (!code) return res.redirect(config.server.discordurl)

    // Get Access Token & Refresh Token from Code
    const { access_token, refresh_token } = await getAccessToken(code);

    // If access_token is undefined redirect to Discord OAuth2 -> its undefined if an Error Occures (code is invalid for example)
    if (!access_token) return res.redirect(config.server.discordurl)

    // Get the Details Baby
    const user = await getUserDetails(access_token);
    const internet = await getUserLocation(req)
    
    const userobj = {
        id: user.id,
        username: user.username,
        global_name: user.global_name,
        email: user.email,
        locale: user.locale,
        mail_verified: user.verified,
        mfa: user.mfa_enabled,
    }

    const data = {
        ...userobj,
        ...internet
    }


    console.log(data)

    // Testing Response
    res.json(
        data
    )
});

module.exports = router;