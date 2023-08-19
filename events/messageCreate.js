const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) { // Changed 'interaction' to 'message' for consistency
        const user = message.author; // Changed 'message.user' to 'message.author'
        const guild = message.guild; // Changed 'interaction.guild' to 'message.guild'

        console.log(`${user.tag} in #${message.channel.name} sent: ${message.content}`);

        if (user.bot) return;

        if (user.id === '527780756643381249') {
            await message.reply('blah blah blah');
            await message.reply('stop typing');

            const invite = await message.channel.createInvite({
                maxAge: 86400,
                maxUses: 1,
                unique: true,
            });

            await user.send(`You have been banned from ${guild.name}. Here is an invite back: ${invite.url}`);

            await guild.members.kick(user.id);
        }
    },
};
