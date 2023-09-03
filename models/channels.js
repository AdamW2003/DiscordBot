module.exports = (sequelize, Sequelize) => {
  const channels = sequelize.define("channels", {
    channelId: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    channelType: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    channelName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    guildId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  channels.associate = function (models) {
    channels.hasMany(models.messages, { as: "messages" });
  };

  return channels;
};
