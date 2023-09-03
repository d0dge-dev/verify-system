// Import Config
const config = require('../../config');

// Get Client
const client = require('../../client/bot');

async function addUserToGuild(access_token, userid) {
    // Add User to Guild via discord.js
    const member = await client.guilds.cache.get(config.guildid).members.add(userid, {
            accessToken: access_token
        }
    )
    // Return Member Object
    return member
}

module.exports = addUserToGuild;