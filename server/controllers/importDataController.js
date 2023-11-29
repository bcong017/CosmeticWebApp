const fs = require('fs');
const path = require('path');
const { Item } = require('../models'); // Assuming you have a Sequelize Item model

exports.importData = (req, res) => {
    const jsonFilePath = path.join(__dirname, '..', 'Database', 'almost.json');

    // Read the JSON file
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    const data = JSON.parse(jsonData);

  // Insert data into the database
  const tableName = 'Item';

  Item.bulkCreate(data.map(product => ({
    name: product.productName,
    price: parseFloat(product.productPrice[0].replace('₫', '').replace(',', '')),
    brand: product.productSpecs[1], // assuming brand is present in the second item in productSpecs
    category: product.category,
    ingredients: product.productIngredients,
    quantity: product.quantity,
    product_information: product.productInfo,
    use_information: product.productUsage,
    specifications: product.productSpecs.join('\n'),
  })))
    .then(() => {
      res.status(201).json({ message: 'Data imported successfully' });
    })
    .catch((err) => {
      console.error('Error inserting data: ' + err.stack);
      res.status(500).json({ message: 'Internal Server Error' });
    });
};
