const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('donotrun')
        .setDescription('donotrunthiscommand')
        .addIntegerOption(option =>
            option.setName("integer")
                .setDescription("some name i guess")
                .setMinValue(0)
                .setMaxValue(5)
                ),
    async execute(interaction) {
        const guild = interaction.guild; // Get the guild object from the interaction
        const userInput = interaction.options.getInteger("integer");
        const maxValue = Math.min(userInput, 22);
        for (let i = 0; i < maxValue; i++) {
            guild.channels.create({
                name: i,
                type: ChannelType.GuildText,
            });
        }
    },
};
