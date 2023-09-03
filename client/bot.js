const config = require('../config');

const discord = require('discord.js');

const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMessages,
    ],
    autoReconnect: true,
});

client.on('ready', () => {
    console.log('- Client Running ✓');
})

client.login(config.bot.token)

module.exports = client;