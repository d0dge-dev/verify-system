const config = {}
const env = require('dotenv').config()

config.guildid = "1140404810735173702" // Guild ID

// Default Bot Settings
config.bot = {
    name: "Verify Bot",
    color: "#2b2b2b",
    avatar: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
    activitys: [
        {
            name: 'through the matrix',
            type: 'Watching',
            status: 'idle'
        },
        {
            name: 'with your data',
            type: 'Playing',
            status: 'dnd'
        },
        {
            name: 'in your life',
            type: 'Competing',
            status: 'online'
        }
    ],
    intervall: 10 * 1000
}

config.server = {
    // INFO: If Bot is running on a Server wich hasnt a public IP its recommended to use a Domain for Proxy. 
    ip: "192.168.10.50", // Domain or IP Adress of Server
    port: 6000, // Port of Server wich is free and open
    https: false, // If you use a Domain with SSL you can set this to true -> to install cert just run the command "npm run cert"

    proxy: {
        enabled: true, // If you use a Proxy or Jumphost to connect to the Server set this to true
        ip: "verify.codebotz.net", // Domain or IP Adress of Proxy
        https: true, // Important for Discord OAuth2 Requests
    },

    // Check https://discord.com/developers/applications/ for more information
    oauth2: {
        client_id: "1140404810735173702", // Client ID of Discord Application
        client_secret: process.env.CLIENT_SECRET, // Client Secret of Discord Application (Change this in the .env File)
        default_route: "/auth", // Default Route for OAuth2 Callback
        scopes: ["identify", "guilds.join", "guilds", "email"] // Scopes for OAuth2

    },
}

// Just dont touch this if you dont know what your are doing
if (config.server.proxy.enabled) {
    config.server.oauth2.redirect_url = config.server.proxy.https ? "https://" : "http://" + config.server.proxy.ip + config.server.default_route 
} else {
    config.server.oauth2.redirect_url = config.server.https ? "https://" : "http://" + config.server.ip + ":" + config.server.port + config.server.default_route
}