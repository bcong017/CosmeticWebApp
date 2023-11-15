const express = require('express');
const mysql = require('mysql');
const app = express();

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'DA2',
    password: '480963b8ff099c6620ac6935d79aa6242cb81bd74d5fd805577adaf4f2522472a6a716f23c69eb0e038cd0dc8eb16e36',
    database: 'cosmetic'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Define a route to get products
app.get('/products', (req, res) => {
    // Query your MySQL database to fetch products
    db.query('SELECT * FROM item', (err, results) => {
        if (err) {
            res.status(500).send('Error fetching products');
        } else {
            res.json(results); // Send the products as a JSON response
        }
    });
});

// Other routes can be similarly defined for different functionalities.

// Start the server
const PORT = 3000; // or any port you prefer
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
