// models/item/item.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Item = sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_urls: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.STRING(500),
    },
    price: {
      type: DataTypes.DECIMAL(10, 3),
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
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    user_rating: {
      type: DataTypes.DECIMAL(3, 2),
    },
    rate_count: {
      type: DataTypes.INTEGER,
    },
    sold_count: {
      type: DataTypes.INTEGER,
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
