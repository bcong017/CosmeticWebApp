// models/order/order.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATE,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 3),
    },
    shipping_fee: {
      type: DataTypes.DECIMAL(10, 3),
    },
    is_confirm: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
    });
  };

  return Order;
};
