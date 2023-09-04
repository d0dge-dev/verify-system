const embedcreator = require('./embedcreator')

// Import Config
const config = require('../../config');

function logtodc(action, reason, member) {
    let embed = embedcreator('log.embed')
    embed.data.description = embed.data.description.replace('{action}', action).replace('{reason}', reason).replace('{member}', member.user.toString())

    let channel = member.guild.channels.cache.get(config.log.channel)

    if (!channel) return console.log('Log Channel not found')

    channel.send({embeds: [embed]})
}

module.exports = logtodc;