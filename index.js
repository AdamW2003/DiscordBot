const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, 
									GatewayIntentBits.GuildMessages, 
									GatewayIntentBits.GuildMembers, 
									GatewayIntentBits.MessageContent] });

// const client = new Client({ ws: { intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS' 'GUILD_MESSAGES'] } });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on('message', message => {
	console.log(message.content);
});

client.on(Events.MessageCreate, message => {
	// if (!message.content.startsWith(prefix) || message.author.bot) return;
	if (message.author.bot) return;

	// const args = message.content.slice(prefix.length).trim().split(/ +/);
	// const command = args.shift().toLowerCase();

	// if (command === 'ping') {
	// 	console.log("ping sent")
	// 	message.channel.send('Pong.');
	// } else if (command === 'beep') {
	// 	message.channel.send('Boop.');
	// }
	message.author.send("Hello there!");
	message.channel.send(`I hate you ${message.author}!`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);