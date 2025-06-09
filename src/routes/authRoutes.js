const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para registro y login de usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioAuth:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         password:
 *           type: string
 *           description: Contraseña
 *     TokenResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Token JWT
 */

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioAuth'
 *     responses:
 *       201:
 *         description: Usuario registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       500:
 *         description: Error del servidor
 */

// Ruta para registrar nuevos usuarios
router.post('/registrar', authController.registrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioAuth'
 *     responses:
 *       200:
 *         description: Sesión iniciada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error del servidor
 */

// Ruta para iniciar sesión
router.post('/login', authController.login);

module.exports = router;