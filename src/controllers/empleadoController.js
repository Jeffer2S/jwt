const Empleado = require('../models/Empleado');
const { getConnection } = require('../config/database');

exports.createEmpleado = async (req, res) => {
  try {
    const { nombre, cargo, hospitalId, hospital_id } = req.body;
    const id = await Empleado.create({ nombre, cargo, hospitalId: hospitalId || hospital_id });
    res.status(201).json({ id, nombre, cargo, hospitalId: hospitalId || hospital_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmpleadosPorHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const empleados = await Empleado.findAllByHospital(hospitalId);
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cargo, hospitalId, hospital_id } = req.body;
    await Empleado.update(id, { nombre, cargo, hospitalId: hospitalId || hospital_id });
    res.json({ message: 'Empleado actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    await Empleado.delete(id);
    res.json({ message: 'Empleado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
