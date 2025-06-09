const pool = require('../config/database');

class Medico {
  static async create({ nombre, especialidadId, hospitalId }) {
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      const [result] = await connection.execute(
        'INSERT INTO medicos (nombre, especialidad_id, hospital_id) VALUES (?, ?, ?)',
        [nombre, especialidadId, hospitalId]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error al crear médico:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión después de la consulta
    }
  }

  static async findByHospitalId(hospitalId) {
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM medicos WHERE hospital_id = ?',
        [hospitalId]
      );
      return rows;
    } catch (error) {
      console.error('Error al obtener médicos:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async findAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(`
        SELECT 
          m.id,
          m.nombre,
          m.especialidad_id,
          e.nombre AS especialidad_nombre,
          m.hospital_id,
          h.nombre AS hospital_nombre
        FROM medicos m
        JOIN especialidades e ON m.especialidad_id = e.id
        JOIN hospitales h ON m.hospital_id = h.id
      `);
      return rows;
    } catch (error) {
      console.error('Error al obtener todos los médicos:', error);
      throw error;
    } finally {
      connection.release();
    }
  }
  

  static async findById(id) {
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      const [rows] = await connection.execute('SELECT * FROM medicos WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error al obtener el médico:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async update(id, { nombre, especialidadId, hospitalId }) {
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      await connection.execute(
        'UPDATE medicos SET nombre = ?, especialidad_id = ?, hospital_id = ? WHERE id = ?',
        [nombre, especialidadId, hospitalId, id]
      );
    } catch (error) {
      console.error('Error al actualizar el médico:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      await connection.execute('DELETE FROM medicos WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error al eliminar el médico:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async findByIds(ids) {
    if (!ids || ids.length === 0) return [];
  
    const connection = await pool.getConnection();
    try {
      const placeholders = ids.map(() => '?').join(',');
      const [rows] = await connection.execute(
        `
        SELECT 
          m.id,
          m.nombre,
          e.nombre AS especialidad
        FROM medicos m
        JOIN especialidades e ON m.especialidad_id = e.id
        WHERE m.id IN (${placeholders})
        `,
        ids
      );
      return rows;
    } catch (error) {
      console.error('Error al buscar médicos por IDs:', error);
      throw error;
    } finally {
      connection.release();
    }
  }
  
}

module.exports = Medico;
