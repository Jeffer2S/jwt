require('dotenv').config();
const pool = require('./database');
const mysql = require('mysql2/promise');

async function createDatabaseAndUser() {
    const rootConnection = await mysql.createConnection({
      host: process.env.MARIADB_HOST,
      port: process.env.MARIADB_PORT,
      user: process.env.MARIADB_USER,
      password: process.env.MARIADB_PASSWORD,
    });
  
    await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MARIADB_DATABASE}\``);
    await rootConnection.end();
  
    console.log('Base de datos verificada');
  }
  

async function createTables() {
  const connection = await pool.getConnection();

  // ⚙️ Tabla usuarios con rol y medico_id
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      rol VARCHAR(50) NOT NULL,
      medico_id BIGINT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS hospitales (
      id VARCHAR(255) PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      direccion VARCHAR(255),
      url_api VARCHAR(255)
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS especialidades (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS medicos (
      id INT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      especialidad_id INT,
      hospital_id VARCHAR(255),
      FOREIGN KEY (especialidad_id) REFERENCES especialidades(id) ON DELETE SET NULL,
      FOREIGN KEY (hospital_id) REFERENCES hospitales(id) ON DELETE CASCADE
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS empleados (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      cargo VARCHAR(100),
      hospital_id VARCHAR(255),
      FOREIGN KEY (hospital_id) REFERENCES hospitales(id) ON DELETE CASCADE
    )
  `);

  connection.release();
  console.log('✅ Tablas creadas (si no existían)');
}

async function initDB() {
  await createDatabaseAndUser();
  await createTables();
}

module.exports = initDB;