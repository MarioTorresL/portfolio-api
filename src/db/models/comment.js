module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      },
      UserId: {
          type: DataTypes.INTEGER,
          allowNull: false
      }
  }, {
      paranoid: true
  });

  Comment.associate = function(models) {
    Comment.UserId= Comment.belongsTo(models.User);
  }

  return Comment;
};