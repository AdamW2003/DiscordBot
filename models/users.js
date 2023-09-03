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
    },
    messageCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });

  users.associate = function(models) {
    users.hasMany(models.messages, {as: 'messages'})
  };

  return users;
};
