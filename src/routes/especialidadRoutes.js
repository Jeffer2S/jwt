const express = require('express');
const router = express.Router();
const controller = require('../controllers/especialidadController');

/**
 * @swagger
 * tags:
 *   name: Especialidades
 *   description: Gestión de especialidades médicas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Especialidad:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la especialidad
 *         nombre:
 *           type: string
 *           description: Nombre de la especialidad
 */

/**
 * @swagger
 * /especialidades:
 *   post:
 *     summary: Crear nueva especialidad
 *     tags: [Especialidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Especialidad'
 *     responses:
 *       201:
 *         description: Especialidad creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Especialidad'
 *       500:
 *         description: Error del servidor
 */
router.post('/', controller.createEspecialidad);

/**
 * @swagger
 * /especialidades:
 *   get:
 *     summary: Obtener todas las especialidades
 *     tags: [Especialidades]
 *     responses:
 *       200:
 *         description: Lista de especialidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Especialidad'
 *       500:
 *         description: Error del servidor
 */
router.get('/', controller.getEspecialidades);

/**
 * @swagger
 * /especialidades/{id}:
 *   put:
 *     summary: Actualizar especialidad
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Especialidad'
 *     responses:
 *       200:
 *         description: Especialidad actualizada
 *       404:
 *         description: Especialidad no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', controller.updateEspecialidad);

/**
 * @swagger
 * /especialidades/{id}:
 *   delete:
 *     summary: Eliminar especialidad
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad
 *     responses:
 *       200:
 *         description: Especialidad eliminada
 *       404:
 *         description: Especialidad no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', controller.deleteEspecialidad);

module.exports = router;