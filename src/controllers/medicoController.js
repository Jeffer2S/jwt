const Medico = require('../models/Medico');
const { getConnection } = require('../config/database');

exports.createMedico = async (req, res) => {
  try {
    const { nombre, especialidadId, especialidad_id, hospitalId, hospital_id } = req.body;
    const medicoId = await Medico.create({
      nombre,
      especialidadId: especialidadId || especialidad_id,
      hospitalId: hospitalId || hospital_id,
    });
    res.status(201).json({ id: medicoId, nombre, hospitalId: hospitalId || hospital_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicos = async (req, res) => {
  try {
    const medicos = await Medico.findAll();
    res.json(medicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicoById = async (req, res) => {
  try {
    const { id } = req.params;
    const medico = await Medico.findById(id);
    res.json(medico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMedico = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, especialidadId, especialidad_id, hospitalId, hospital_id } = req.body;
    await Medico.update(id, {
      nombre,
      especialidadId: especialidadId || especialidad_id,
      hospitalId: hospitalId || hospital_id,
    });
    res.status(200).json({ message: 'Médico actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMedico = async (req, res) => {
  try {
    const { id } = req.params;
    await Medico.delete(id);
    res.status(200).json({ message: 'Médico eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getMedicosByHospital = async (req, res) => {
  const { hospitalId } = req.params;
  try {
    const medicos = await Medico.findByHospitalId(hospitalId);
    res.json(medicos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener médicos del hospital.' });
  }
};

