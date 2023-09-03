const messages = require("./messages");

module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define("users", {
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false, 
      primaryKey: true,
    },
    avatarId: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

  users.associate = function(models) {
    users.hasMany(models.messages, {as: 'messages'})
  };

  return users;
};
