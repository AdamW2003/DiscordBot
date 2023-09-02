const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('overwatch')
		.setDescription('overwatch'),
	async execute(interaction) {
		const user = interaction.user;
		const guild = interaction.guild;

		await interaction.reply({
			content: `gg fuck you ${user.username} any last words?`,
		});

        const invite = await interaction.channel.createInvite({
            maxAge: 86400,
            maxUses: 1,
            unique: true,
        });
        
        await user.send(`You have been banned from ${guild.name}. Here is an invite back: ${invite.url}`);

        await interaction.followUp({
            content: `get this ${user.username} bumbaclot outta here`,
        });

        await guild.members.kick(user.id);
	},
};
