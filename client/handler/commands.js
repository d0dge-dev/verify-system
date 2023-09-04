const client = require("../bot");

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "verify") {
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === "send") {
            require("../commands/verify-send")(interaction);
        }
    }
})