const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const {
  prefix,
  token,
} = require("./config/config.json");
const db = require("./models");
const { backgroundProcess } = require('./backgroundProcesses/backgroundservice');

backgroundProcess.start();
console.log("background process running")

db.sequelize.sync({ force: true })
  .then(() => {
    console.log('Models synced with the database');
  })
  .catch((error) => {
    console.error('Error syncing models:', error);
  });

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
	GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();

const commandFolders = fs.readdirSync(path.join(__dirname, "commands"));

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.data.name, command);
  }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) =>
      event.execute(...args, client, prefix, db)
    );
  } else {
    client.on(event.name, (...args) =>
      event.execute(...args, client, prefix, db)
    );
  }
}

client.login(token);
