const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message, _, __) {
    const user = message.author;

    // if (message.channel == '1261307526885019678') {
    //     message.react("\:cheese:")
    // }

    console.log(
      `${user.tag} in #${message.channel.name} sent: ${message.content}`
    );

    if (user.bot) return;

  },
};