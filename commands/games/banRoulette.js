const { SlashCommandBuilder, messageLink } = require('discord.js');
const { debounce } = require("../../helpers/debounce.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('banroulette')
		.setDescription('Randomly ban a member from the server'),
	async execute(interaction) {
        if(!interaction.member.permissions.has("KICK_MEMBERS")) return;

        const randUser = interaction.client.guilds.cache.get(interaction.guildId).members.cache.random().user
        await interaction.reply('gg fuck you ' + randUser.username + ' any last words?');
        debounce(await interaction.guild.members.kick(randUser.id), 5000)
        // await interaction.reply('God i hate that guy');
        interaction.client.users.send(randUser.id, `you have been banned from ${interaction.guild.name} here is an invite back: ${interaction.guild.invite.createInvite(interaction.channel), {maxAge: 0}} we humbily appologise!`);
	},
};