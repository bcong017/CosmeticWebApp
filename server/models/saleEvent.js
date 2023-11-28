// models/saleEvent.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const SaleEvent = sequelize.define('SaleEvent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event_name: {
      type: DataTypes.STRING(100),
    },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    discount_percentage: {
      type: DataTypes.INTEGER,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return SaleEvent;
};
