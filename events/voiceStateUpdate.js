// const { Events } = require('discord.js');
// const { voiceSessionType } = require("../constants/enums");

// module.exports = {
// 	name: Events.VoiceStateUpdate,
// 	async execute(interaction, client, prefix, db) {

//         if (interaction.channelId == null){

//             const userMessageCount = await db.voiceChannelSessions.findOne({
//                 where: { userId: message.author.id },
//                 attributes: ["messageCount"],
//               });

//             await db.voiceChannelSessions.update(
//                 { duration: },
//                 { where: { userId: message.author.id } }
//               );
//         }
//         await db.voiceChannelSessions.create({
//             id: interaction.id,
//             channelId: interaction.channel.id,
//             userId: interaction.user.id,
//             guildId: interaction.guild.id
//           });
// 	},
// };
