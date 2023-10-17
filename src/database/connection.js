const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sai481309@',
    database: 'Items'
  });
  
  db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
  });

module.exports = {db}