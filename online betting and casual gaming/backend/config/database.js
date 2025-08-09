const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host:'localhost',
  user: 'root',
  password: 'markluh@2025',
  database: 'betting19',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;