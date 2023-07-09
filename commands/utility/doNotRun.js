const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('donotrun')
        .setDescription('donotrunthiscommand')
        .addIntegerOption(option =>
            option.setName("integer")
                .setDescription("some name i guess")
                .setMinValue(0)
                .setMaxValue(22)
                ),
    async execute(interaction) {
        const guild = interaction.guild; // Get the guild object from the interaction
        for (let i = 0; i < 5; i++) {
            guild.channels.create({
                name: i,
                type: ChannelType.GuildText,
            });
        }
    },
};
