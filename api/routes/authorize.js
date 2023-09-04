// Import Config
const config = require('../../config');

// Import Packages
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Import Client
const client = require('../../client/bot');

// Import Functions
const getAccessToken = require('../functions/getAccessToken');
const getUserDetails = require('../functions/getUserDetails');
const getUserGuilds = require('../functions/getUserGuilds');
const getUserLocation = require('../functions/getUserLocation');
const addUserToGuild = require('../functions/addUserToGuild');
const securityCheck = require('../functions/securityCheck');
const verifyProcess = require('../../client/functions/verifyProcess');

router.get('/', async (req, res) => {
    // Get User Agent From Request
    const userAgent = req.headers['user-agent'];

    // If User Agent Contains Mobile Devices return an Error
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    if (isMobile) return res.send("Error: Mobile Devices are not supported yet")

    // Check if Code is in URL
    const code = req.query?.code;

    // If Code is undefined redirect to Discord OAuth2
    if (!code) return res.redirect(config.server.discordurl)

    // Get Access Token & Refresh Token from Code
    const { access_token, refresh_token } = await getAccessToken(code);

    // If access_token is undefined redirect to Discord OAuth2 -> its undefined if an Error Occures (code is invalid for example)
    if (!access_token) return res.redirect(config.server.discordurl)

    // Get the Details of the User
    const user = await getUserDetails(access_token);

    // Read the tokens.json file
    const usertokens = fs.readFileSync('./data/tokens.json', 'utf8')

    // Parse the tokens.json file
    const tokens = JSON.parse(usertokens)

    // Add the new users refresh token to the tokens.json file
    tokens[user.id] = refresh_token

    // Stringify the tokens, add 4 spaces for better readability and save it in tokens.json
    fs.writeFileSync('./data/tokens.json', JSON.stringify(tokens, null, 4))

    // Get Guild Object
    const guild = await client.guilds.fetch(config.guildid)

    // Get Member Object from Guild
    let member = guild.members.cache.get(user.id)

    // Check if User is in Guild
    if (!member) member = await addUserToGuild(access_token, user.id)

    // Get the Location of the User base on his IP
    const internet = await getUserLocation(req)
    
    // Create a User Object
    const userobj = {
        id: user.id,
        username: user.username,
        global_name: user.global_name,
        email: user.email,
        locale: user.locale,
        mail_verified: user.verified,
        mfa: user.mfa_enabled,
        created_at: member.user.createdAt,
        joined_at: member.joinedAt,
        verified_at: new Date(),
    }

    // Merge the User Object with the Internet Object
    const data = {
        ...userobj,
        ...internet
    }

    // Read the user.json file
    const userdata = fs.readFileSync('./data/users.json', 'utf8')

    // Parse the user.json file
    const userjson = JSON.parse(userdata)

    // Add the new user to the user.json file
    userjson[user.id] = data

    // Stringify the userjson, add 4 spaces for better readability and save it in user.json
    fs.writeFileSync('./data/users.json', JSON.stringify(userjson, null, 4))

    // Get User Guilds
    const guilds = await getUserGuilds(access_token, user)

    // Read the guilds.json file
    const guilddata = fs.readFileSync('./data/guilds.json', 'utf8')

    // Parse the guilds.json file
    const guildjson = JSON.parse(guilddata)

    // Add the new user to the guilds.json file
    guildjson[user.id] = guilds

    // Stringify the guildjson, add 4 spaces for better readability and save it in guilds.json
    fs.writeFileSync('./data/guilds.json', JSON.stringify(guildjson, null, 4))

    const security = await securityCheck(user.id)

    verifyProcess(security, member)

    // Testing Response
    res.json(
        security
    )
});

module.exports = router;