const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD || '', // Jika kosong, gunakan string kosong
  database: process.env.DATABASE,
});

module.exports = pool.promise();
