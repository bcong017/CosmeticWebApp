const fs = require("fs");
const path = require("path");
const { Item } = require("../models"); // Assuming you have a Sequelize Item model

exports.importData = (req, res) => {
  const jsonFilePath = path.join(__dirname, "..", "Database", "complete.json");

  // Read the JSON file
  const jsonData = fs.readFileSync(jsonFilePath, "utf8");
  const data = JSON.parse(jsonData);

  // Insert data into the database
  const tableName = "Item";

  Item.bulkCreate(data.map((product) => ({
    name: product.productName,
    price: parseFloat(product.productPrice[0].replace(' ₫', '').replace(',', '')),
    brand: product.productSpecs.Brand,
    category: product.category,
    ingredients: product.productIngredients,
    quantity: product.quantity,
    product_information: product.productInfo,
    use_information: product.productUsage,
    specifications: JSON.stringify(product.productSpecs),
    image_urls: product.imageUrls.join("***"),
    user_rating: parseFloat(product.userRating),
    rate_count: product.rateCount,
    sold_count: product.soldCount,
  })))
  .then(() => {
    res.status(201).json({ message: 'Data imported successfully' });
  })
  .catch((err) => {
    console.error('Error inserting data: ' + err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  });
};
