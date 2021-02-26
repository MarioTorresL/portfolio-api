module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Comments', {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      comment: {
        type: Sequelize.DATE,
        allowNull: false
      },
      UserId: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
  }, {
      paranoid: true
  });

  Comments.associate = function(models) {
    Comments.UserId= Activities.belongsTo(models.Users);
  }


  return Comments;
};