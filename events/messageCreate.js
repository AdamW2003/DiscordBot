const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
        const user = interaction.user;
        const guild = interaction.guild;

		console.log(`${interaction.author.tag} in #${interaction.channel.name} sent: ${interaction.content}`);

        if (interaction.author.bot) return;

        if (user.id == '527780756643381249'){
            await interaction.reply('blah blah blah');
            await interaction.reply('stop typing')

            const invite = await interaction.channel.createInvite({
                maxAge: 86400,
                maxUses: 1,
                unique: true,
            });
            
            await user.send(`You have been banned from ${guild.name}. Here is an invite back: ${invite.url}`);

            await guild.members.kick(user.id);
        }
	},
};