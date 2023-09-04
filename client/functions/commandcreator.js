const client = require("../bot");
const discord = require('discord.js');

// create a new command

const command = new discord.SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify yourself')
    .addSubcommand(subcommand =>
        subcommand
            .setName('send')
            .setDescription('Send a verification message')
    )

const rawdata = command.toJSON()

// set the command to the client
client.application.commands.create(rawdata)