// models/item/item.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Item = sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(500),
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    brand: {
      type: DataTypes.STRING(100),
    },
    category: {
      type: DataTypes.STRING(100),
    },
    ingredients: {
      type: DataTypes.TEXT,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    product_information: {
      type: DataTypes.TEXT,
    },
    use_information: {
      type: DataTypes.TEXT,
    },
    specifications: {
      type: DataTypes.TEXT,
    },
    is_on_sale: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Item.associate = (models) => {
    Item.belongsTo(models.SaleEvent, {
      foreignKey: 'sale_event_id',
    });
    Item.hasMany(models.Comment, {
      foreignKey: 'item_id',
    });
  };

  return Item;
};
