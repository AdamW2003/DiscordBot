const { SlashCommandBuilder, messageLink } = require('discord.js');
const { debounce } = require("../../helpers/debounce.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('banroulette')
		.setDescription('Randomly ban a member from the server'),
	async execute(interaction) {
                if(!interaction.member.permissions.has("KICK_MEMBERS")) return;

                const randUser = interaction.client.guilds.cache.get(interaction.guildId).members.cache.random().user
                await user.send(`get this ${user.username} bumbaclot outta here`);

                const invite = await interaction.channel.createInvite({
			maxAge: 86400,
			maxUses: 1,
			unique: true,
		});

		await randUser.send(`You have been banned from ${interaction.guild.name}. Here is an invite back: ${invite.url}`);
                await interaction.guild.members.kick(randUser.id)
                await interaction.reply('God i hate that guy');


	},
};
