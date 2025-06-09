const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');

/**
 * @swagger
 * tags:
 *   name: Médicos
 *   description: Gestión de médicos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Medico:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del médico
 *         nombre:
 *           type: string
 *           description: Nombre del médico
 *         especialidad_id:
 *           type: integer
 *           description: ID de la especialidad
 *         hospital_id:
 *           type: integer
 *           description: ID del hospital
 */

/**
 * @swagger
 * /medicos:
 *   post:
 *     summary: Crear nuevo médico
 *     tags: [Médicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medico'
 *     responses:
 *       201:
 *         description: Médico creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medico'
 *       500:
 *         description: Error del servidor
 */
router.post('/', medicoController.createMedico);

/**
 * @swagger
 * /medicos:
 *   get:
 *     summary: Obtener todos los médicos
 *     tags: [Médicos]
 *     responses:
 *       200:
 *         description: Lista de médicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medico'
 *       500:
 *         description: Error del servidor
 */
router.get('/', medicoController.getMedicos);

/**
 * @swagger
 * /medicos/{id}:
 *   get:
 *     summary: Obtener médico por ID
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Datos del médico
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medico'
 *       404:
 *         description: Médico no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', medicoController.getMedicoById);

/**
 * @swagger
 * /medicos/{id}:
 *   put:
 *     summary: Actualizar médico
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medico'
 *     responses:
 *       200:
 *         description: Médico actualizado
 *       404:
 *         description: Médico no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', medicoController.updateMedico);

/**
 * @swagger
 * /medicos/{id}:
 *   delete:
 *     summary: Eliminar médico
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Médico eliminado
 *       404:
 *         description: Médico no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', medicoController.deleteMedico);

/**
 * @swagger
 * /medicos/hospital/{hospitalId}:
 *   get:
 *     summary: Obtener todos los médicos por hospital
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: hospitalId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hospital
 *     responses:
 *       200:
 *         description: Lista de médicos del hospital
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medico'
 *       500:
 *         description: Error del servidor
 */
router.get('/hospital/:hospitalId', medicoController.getMedicosByHospital);

module.exports = router;
