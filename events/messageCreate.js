const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	execute(message, prefix) {
        
		console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);

        if (message.author.bot) return;

        if (!message.content.startsWith(prefix)) return;
    
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
    
        if (!client.commands.has(command)) return;
    
	},
};