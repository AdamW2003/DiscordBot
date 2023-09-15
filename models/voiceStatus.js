module.exports = (sequelize, Sequelize) => {
    const voiceStatus = sequelize.define("voiceStatus", {
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
    });
  
    // voiceStatus.associate = function(models) {
    //   voiceStatus.belongsTo(models.channels, { foreignKey: 'channelId', as: 'channel', sourceKey: 'channelId' })
    // };
  
    return voiceStatus;
  };
  