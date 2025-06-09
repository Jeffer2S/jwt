const pool = require('../config/database');

class Usuario {
  // Método para crear un nuevo usuario
  static async create({ username, password, rol = 'doctor', medico_id = null }) {
    const connection = await pool.getConnection();
    try {
      // Inserta el usuario en la base de datos
      const [result] = await connection.execute(
        'INSERT INTO usuarios (username, password, rol, medico_id) VALUES (?, ?, ?, ?)',
        [username, password, rol, medico_id]
      );
      return result.insertId;
    } finally {
      connection.release();
    }
  }

  // Método para buscar un usuario por su nombre de usuario
  static async findOne({ username }) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM usuarios WHERE username = ?',
        [username]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }
}
module.exports = Usuario;
