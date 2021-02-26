module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      comment: {
        type: DataTypes.DATE,
        allowNull: false
      },
      UserId: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
  }, {
      paranoid: true
  });

  Comment.associate = function(models) {
    Comment.UserId= Comment.belongsTo(models.User);
  }

  return Comment;
};