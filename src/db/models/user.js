module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
  User.associate = function(models) {
    User.hasMany(models.Comment)
  }


  return User;
};