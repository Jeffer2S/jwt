const pool = require('../config/database');

class Hospital {
  static async create({ id, nombre, direccion, urlApi }) { 
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      const [result] = await connection.execute(
        'INSERT INTO hospitales (id, nombre, direccion, url_api) VALUES (?, ?, ?, ?)',
        [id, nombre, direccion, urlApi]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error al crear hospital:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async findAll() {
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      const [rows] = await connection.execute('SELECT * FROM hospitales');
      return rows;
    } catch (error) {
      console.error('Error al obtener hospitales:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async findById(id) {
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      const [rows] = await connection.execute('SELECT * FROM hospitales WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error al obtener hospital por ID:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async update(id, { nombre, direccion, urlApi }) {
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      await connection.execute(
        'UPDATE hospitales SET nombre = ?, direccion = ?, url_api = ? WHERE id = ?',
        [nombre, direccion, urlApi, id]
      );
    } catch (error) {
      console.error('Error al actualizar hospital:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      await connection.execute('DELETE FROM hospitales WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error al eliminar hospital:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }
}

module.exports = Hospital;
