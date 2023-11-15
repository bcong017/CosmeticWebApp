const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'DA2',
    password: 'hehehelol123',
    database: 'cosmetic'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + db.threadId);
});

// You can then use this 'db' connection throughout your application to query your MySQL database.
