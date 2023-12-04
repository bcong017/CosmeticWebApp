// models/user/user.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(12),
      unique: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Cart, {
      foreignKey: 'user_id',
    });
    User.hasMany(models.Comment, {
      foreignKey: 'user_id',
    });
    User.hasMany(models.Order, {
      foreignKey: 'user_id',
    });
  };

  return User;
};
