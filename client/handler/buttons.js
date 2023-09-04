const client = require("../bot");

const config = require("../../config")

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === config.verify.faq.id) {
        const embedcreator = require('../functions/embedcreator')

        const embed = embedcreator('verify.faq')

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
})