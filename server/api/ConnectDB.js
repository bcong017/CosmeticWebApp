const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'DA2',
    //password: '480963b8ff099c6620ac6935d79aa6242cb81bd74d5fd805577adaf4f2522472a6a716f23c69eb0e038cd0dc8eb16e36',
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
