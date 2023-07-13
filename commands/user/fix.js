const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fix')
        .setDescription('fix for account'),
	async execute(interaction) {
		console.log(interaction.member.user);
        let role = interaction.guild.roles.cache.get("380082720669433857");
        console.log(role.members.size);
        try {
            await interaction.member.roles.remove(role).catch(console.error);
            console.log("complete");
        }
        catch (error) {
            console.log("bot does not have permission to add command")
        }
	},
};
