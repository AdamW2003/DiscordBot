const users = require("./users");

module.exports = (sequelize, Sequelize) => {
    const messages = sequelize.define("messages", {
      messageId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      channelId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  
    messages.associate = function(models) {
        messages.belongsTo(models.users, { foreignKey: 'userId', as: 'user', sourceKey: 'userId' })
    };
  
    return messages;
  };
  