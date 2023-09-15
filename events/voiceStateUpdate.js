const { Events } = require("discord.js");
const { channelType } = require("../constants/enums");


module.exports = {
  name: Events.VoiceStateUpdate,
  async execute(newState, oldState, client, prefix, db) {
    // console.log(newState);
    // console.log(oldState);
    let newUserChannel = newState.channel;
    let oldUserChannel = oldState.channel;
    if (oldUserChannel === null && newUserChannel !== null) {

      //user leave
      
    } else if (oldUserChannel !== null && newUserChannel === null) {
        await db.channel.findOrCreate({
            where: { channelId: newState.channelId },
            defaults: {
                channelId: newState.channelId,
                channelType: channelType.voice,
                channelName: newState.channel.name,
                guildId: newState.guildId,
            }
          });
    
          await db.voiceStatus.create({
            id: newState.id,
            channelId: newState.channelId,
            userId: newState.ownerId,
            guildId: newState.guildId,
          });
    
    } else if (
      oldUserChannel !== null &&
      newUserChannel !== null &&
      oldUserChannel.id != newUserChannel.id
    ) {
      // User Switch a voice channel
      // This is bonus if you want to do something futhermore
    }

    // if (interaction.channelId == null){

    //     const userMessageCount = await db.voiceChannelSessions.findOne({
    //         where: { userId: message.author.id },
    //         attributes: ["messageCount"],
    //       });

    //     await db.voiceChannelSessions.update(
    //         { duration: },
    //         { where: { userId: message.author.id } }
    //       );
    // }
    // await db.voiceChannelSessions.create({
    //     id: interaction.id,
    //     channelId: interaction.channel.id,
    //     userId: interaction.user.id,
    //     guildId: interaction.guild.id
    //   });
  },
};
