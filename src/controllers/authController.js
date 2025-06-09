const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const { getConnection } = require('../config/database');
require('dotenv').config();

// Función para generar el token JWT
const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, username: usuario.username },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }  // El token expira en 8 horas
  );
};

// Controlador para registrar nuevos usuarios
exports.registrar = async (req, res) => {
    try {
      const { username, password } = req.body;
      // Encripta la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Crea el usuario en la base de datos
      const id = await Usuario.create({ username, password: hashedPassword });
  
      const usuario = { id, username };
      // Genera el token JWT
      const token = generarToken(usuario);
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// Controlador para el login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Busca el usuario en la base de datos
    const usuario = await Usuario.findOne({ username });
    
    // Verifica si el usuario existe y la contraseña es correcta
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Genera el token JWT
    const token = generarToken(usuario);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware para verificar el token JWT
exports.verifyToken = (req, res, next) => {
  // Obtiene el token del header de autorización
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }
  
  // Verifica el token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    // Guarda el ID del usuario en el request para uso posterior
    req.userId = decoded.id;
    next();
  });
};