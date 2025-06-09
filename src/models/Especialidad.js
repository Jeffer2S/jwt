const pool = require('../config/database');

class Especialidad {
  static async create({ nombre }) { 
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      const [result] = await connection.execute(
        'INSERT INTO especialidades (nombre) VALUES (?)',
        [nombre]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error al crear especialidad:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async findAll() { 
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      const [rows] = await connection.execute('SELECT * FROM especialidades');
      return rows;
    } catch (error) {
      console.error('Error al obtener especialidades:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async findById(id) { 
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      const [rows] = await connection.execute('SELECT * FROM especialidades WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error al obtener especialidad por ID:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async update(id, { nombre }) { 
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      await connection.execute('UPDATE especialidades SET nombre = ? WHERE id = ?', [nombre, id]);
    } catch (error) {
      console.error('Error al actualizar especialidad:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async delete(id) { 
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      await connection.execute('DELETE FROM especialidades WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error al eliminar especialidad:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }
}

module.exports = Especialidad;
