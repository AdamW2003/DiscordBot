const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
const Discord = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// console.log(commandsFiles); //shows list of all files in commands folder

for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.interactionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

client.login(token);