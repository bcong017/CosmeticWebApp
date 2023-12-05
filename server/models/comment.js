// models/comment/comment.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    comment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    Comment.belongsTo(models.Item, {
      foreignKey: 'item_id',
    });
  };

  return Comment;
};
