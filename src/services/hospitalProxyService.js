const axios = require('axios');
const Hospital = require('../models/Hospital');
const Medico = require('../models/Medico');

exports.getConsultasDelHospital = async (hospitalId, tokenSpring) => {
  const hospital = await Hospital.findById(hospitalId);
  if (!hospital) throw new Error('Hospital no encontrado');

  let baseUrl = hospital.url_api || hospital.urlApi;
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = 'http://' + baseUrl;
  }

  const fullUrl = new URL('/consultas', baseUrl).href;

  try {
    const response = await axios.get(fullUrl, {
      headers: { Authorization: `Bearer ${tokenSpring}` },
    });

    const consultas = response.data;

    // 🧠 Extraer IDs únicos de médicos
    const medicoIds = [...new Set(consultas.map((c) => c.medicoId))];
    const medicos = await Medico.findByIds(medicoIds);

    // 🔁 Mapeo por ID
    const medicoMap = {};
    medicos.forEach((m) => {
      medicoMap[m.id] = m;
    });

    // ✅ Enriquecer cada consulta
    const consultasEnriquecidas = consultas.map((consulta) => ({
      ...consulta,
      medico: medicoMap[consulta.medicoId] || {
        nombre: 'Desconocido',
        especialidad: 'N/A',
      },
    }));

    return consultasEnriquecidas;
  } catch (error) {
    console.error('❌ Error al obtener consultas del hospital:', error.message);
    if (error.response) {
      console.error('📄 Detalles:', error.response.data);
    }
    throw new Error('Error al obtener las consultas del hospital');
  }
};
