const mysql = require('mysql2'); // 🔥 WAJIB ADA

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'FoodWaste'
});

module.exports = db;