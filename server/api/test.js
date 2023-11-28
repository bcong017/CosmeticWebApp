const { Sequelize } = require('sequelize');

// Replace these values with your actual database credentials
const sequelize = new Sequelize('cosmetic', 'DA2', 'hehehelol123', {
  host: 'localhost',
  dialect: 'mysql',
});

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the function to test the connection
testDatabaseConnection();
