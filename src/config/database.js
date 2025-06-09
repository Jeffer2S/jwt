require('dotenv').config();
const mysql = require('mysql2/promise');

// Configuración del pool de conexiones
const pool = mysql.createPool({
  host: process.env.MARIADB_HOST || 'localhost',
  port: process.env.MARIADB_PORT || 3306,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
});

const getConnection = async () => {
  return pool.getConnection(); 
};

module.exports = { getConnection };
