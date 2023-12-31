// models/cart/cart.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Cart = sequelize.define('Cart', {
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
    quantity: {
      type: DataTypes.INTEGER,
    },
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    Cart.belongsTo(models.Item, {
      foreignKey: 'item_id',
    });
  };

  return Cart;
};