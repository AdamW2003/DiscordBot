const { Events } = require("discord.js");
const { channelType } = require("../constants/enums");

module.exports = {
  name: Events.MessageCreate,
  async execute(message, _, __, db) {
    const user = message.author;
    const guild = message.guild;

    console.log(
      `${user.tag} in #${message.channel.name} sent: ${message.content}`
    );

    if (user.bot) return;

    const userMessageCount = await db.users.findOne({
      where: { userId: message.author.id },
      attributes: ["messageCount"],
    });

    if (userMessageCount == null) {
      await db.users.create({
        userName: message.author.username,
        userId: message.author.id,
        avatarId: message.author.avatar,
      });
    } else {
      const newCount = userMessageCount.messageCount + 1;
      await db.users.update(
        { messageCount: newCount },
        { where: { userId: message.author.id } }
      );
    }

    const channel = await db.channels.findOne({
      where: { channelId: message.channelId },
    });

    if (channel == null){
        await db.channels.create({
            channelId: message.channelId,
            channelType: channelType.text,
            channelName: message.channel.name,
            guildId: message.guildId,
          });
    }

    await db.messages.create({
      messageId: message.id,
      content: message.content,
      channelId: message.channel.id,
      userId: message.author.id,
    });

    // switch(user.id){
    //     case "":
    //         await message.reply(user.name);
    //         break;

    //     case "":
    //         await message.reply('blah blah blah');

    //         const invite = await message.channel.createInvite({
    //             maxAge: 86400,
    //             maxUses: 1,
    //             unique: true,
    //         });

    //         await user.send(`You have been banned from ${guild.name}. Here is an invite back: ${invite.url}`);

    //         await guild.members.kick(user.id);
    //         break;
    //     case "":
    //         const content = `in the tone of a 50s fast talking Italian American gangster create an insult for someone named ${user.name}`
    //         const response = await openai.chat.completions.create({
    //             model: 'gpt-3.5-turbo',
    //             messages: [
    //                 {
    //                     // name:
    //                     role: 'user',
    //                     content: content
    //                 }
    //             ]
    //         }).catch((error) => console.error('openAI Error:\n', error))
    //         message.reply(response)
    //         console.log(response);
    //         break;
    // }
  },
};
