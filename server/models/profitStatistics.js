// models/profitStatistics/profitStatistics.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProfitStatistics = sequelize.define('ProfitStatistics', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sale_date: {
      type: DataTypes.DATE,
    },
    sale_price: {
      type: DataTypes.DECIMAL(10, 3),
    },
    cost_price: {
      type: DataTypes.DECIMAL(10, 3),
    },
    profit: {
      type: DataTypes.DECIMAL(10, 3),
    },
  });

  ProfitStatistics.associate = (models) => {
    ProfitStatistics.belongsTo(models.Item, {
      foreignKey: 'item_id',
    });
  };

  return ProfitStatistics;
};
