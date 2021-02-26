module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
      firstName: {
          type: DataTypes.STRING,
          allowNull: false
      },
      surname: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false
      },
      encryptedPassword: {
          type: DataTypes.STRING,
          allowNull: false
      },
      role:{
          type: DataTypes.INTEGER,
          allowNull: false
      },
  }, {
      paranoid: true,
      timestamps: true,
  });
  Users.associate = function(models) {
    Users.hasMany(models.Comments)
  }

  Users.hasTracking();

  return Users;
};