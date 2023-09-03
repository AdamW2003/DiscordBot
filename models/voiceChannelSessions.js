module.exports = (sequelize, Sequelize) => {
    const voiceChannelSessions = sequelize.define("voiceChannelSessions", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      channelId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      guildId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      duration: {
        type: Sequelize.DATE
      }
    });
  
    voiceChannelSessions.associate = function(models) {
        voiceChannelSessions.belongsTo(models.channels, { foreignKey: 'channelId', as: 'channel', sourceKey: 'channelId' })
    };
  
    return voiceChannelSessions;
  };
  