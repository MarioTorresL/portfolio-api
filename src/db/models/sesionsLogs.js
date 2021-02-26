module.exports = (sequelize, DataTypes) => {
  const SessionsLogs = sequelize.define('SessionsLogs', {
    operation: {
        type: DataTypes.STRING,
        allowNull: false
    },
  });

  SessionsLogs.associate = function(models) {
    SessionsLogs.UsersId = SessionsLogs.belongsTo(models.User, { foreignKey:'UserId' });
  }

  return SessionsLogs;
};