const fs = require('fs');
const mysql = require('mysql');

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'DA2',
    password: 'hehehelol123',
    database: 'Cosmetic'
});

// Read the JSON file
const jsonData = fs.readFileSync('almost.json', 'utf8');
const data = JSON.parse(jsonData);

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + db.threadId);

    // Insert data into MySQL
    const tableName = 'Item'; // replace with your actual table name

    data.forEach((product) => {
        const productInfo = product.productInfo;
        const productSpecs = product.productSpecs.join('\n');
        const productIngredients = product.productIngredients;
        const productUsage = product.productUsage;

        const query = `INSERT INTO ${tableName} 
                       (name, price, brand, category, ingredients, quantity, product_information, use_information, specifications) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(query, [
            product.productName,
            parseFloat(product.productPrice[0].replace('₫', '').replace(',', '')), // assuming price is a number without currency symbols
            product.productSpecs[1], // assuming brand is present in the second item in productSpecs
            product.category,
            productIngredients,
            product.quantity,
            productInfo,
            productUsage,
            productSpecs
        ], (err, result) => {
            if (err) {
                console.error('Error inserting data: ' + err.stack);
            } else {
                console.log('Inserted row with ID ' + result.insertId);
            }
        });
    });

    // Close the MySQL connection
    db.end();
});
