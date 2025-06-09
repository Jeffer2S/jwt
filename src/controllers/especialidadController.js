const Especialidad = require('../models/Especialidad');
const { getConnection } = require('../config/database');

exports.createEspecialidad = async (req, res) => {
  try {
    const { nombre } = req.body;
    const id = await Especialidad.create({ nombre });
    res.status(201).json({ id, nombre });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll();
    res.json(especialidades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEspecialidad = async (req, res) => {
  try {
    const { nombre } = req.body;
    const { id } = req.params;
    await Especialidad.update(id, { nombre });
    res.json({ message: 'Especialidad actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEspecialidad = async (req, res) => {
  try {
    const { id } = req.params;
    await Especialidad.delete(id);
    res.json({ message: 'Especialidad eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
