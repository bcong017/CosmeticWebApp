const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
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
    brand: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  });

  SaleEvent.associate = (models) => {
    SaleEvent.hasMany(models.Item, {
      foreignKey: 'sale_event_id',
    });
  };

  return SaleEvent;
};
