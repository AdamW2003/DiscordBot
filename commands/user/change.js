const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('change')
		.setDescription('change bot to become that of whom you have mentioned')
		.addUserOption(option => option.setName('target').setDescription('The user to become')),
	async execute(interaction) {

		const target = interaction.options.getUser('target');
		try{
        	interaction.client.user.setAvatar(target.displayAvatarURL({ dynamic: true }));
		}
		catch(error){
			interaction.reply({ content: 'There was an error trying to change the bot\'s avatar!', ephemeral: true });	
			console.log("There was an error trying to change the bot\'s avatar! (probably it was changed too recently)");
		}
		try{
			interaction.client.user.setUsername(target.username);
		}
		catch(error){
			interaction.reply({ content: 'There was an error trying to change the bot\'s username', ephemeral: true });
			console.log("There was an error trying to change the bot\'s username! (probably it was changed too recently)")	
		}
        await interaction.client.users.send(target.username, "hello me");
        await interaction.reply(`Changed to ${target.username}'s avatar and username`);
	},
};	