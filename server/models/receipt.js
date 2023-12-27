// models/receipt/receipt.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Receipt = sequelize.define('Receipt', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING(50),
    },
    ship_fee: {
      type: DataTypes.DECIMAL(10, 3)
    }
  });

  Receipt.associate = (models) => {
    Receipt.belongsTo(models.Order, {
      foreignKey: 'order_id',
    });
  };

  return Receipt;
};
