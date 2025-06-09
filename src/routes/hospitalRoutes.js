const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

/**
 * @swagger
 * tags:
 *   name: Hospitales
 *   description: Gestión de hospitales
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Hospital:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del hospital
 *         nombre:
 *           type: string
 *           description: Nombre del hospital
 *         direccion:
 *           type: string
 *           description: Dirección del hospital
 *         urlApi:
 *           type: string
 *           description: URL de la API del hospital
 */

/**
 * @swagger
 * /hospitales:
 *   post:
 *     summary: Crear un nuevo hospital
 *     tags: [Hospitales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hospital'
 *     responses:
 *       201:
 *         description: Hospital creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hospital'
 *       500:
 *         description: Error al crear el hospital
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/', hospitalController.createHospital);

/**
 * @swagger
 * /hospitales:
 *   get:
 *     summary: Obtener todos los hospitales
 *     tags: [Hospitales]
 *     responses:
 *       200:
 *         description: Lista de hospitales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hospital'
 *       500:
 *         description: Error al obtener los hospitales
 */
router.get('/', hospitalController.getHospitales);

/**
 * @swagger
 * /hospitales/{id}:
 *   get:
 *     summary: Obtener un hospital por ID
 *     tags: [Hospitales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hospital a obtener
 *     responses:
 *       200:
 *         description: Información del hospital
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hospital'
 *       404:
 *         description: Hospital no encontrado
 *       500:
 *         description: Error al obtener el hospital
 */
router.get('/:id', hospitalController.getHospitalById);

/**
 * @swagger
 * /hospitales/{id}:
 *   put:
 *     summary: Actualizar un hospital por ID
 *     tags: [Hospitales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hospital a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hospital'
 *     responses:
 *       200:
 *         description: Hospital actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Hospital no encontrado
 *       500:
 *         description: Error al actualizar el hospital
 */
router.put('/:id', hospitalController.updateHospital);

/**
 * @swagger
 * /hospitales/{id}:
 *   delete:
 *     summary: Eliminar un hospital por ID
 *     tags: [Hospitales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hospital a eliminar
 *     responses:
 *       200:
 *         description: Hospital eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Hospital no encontrado
 *       500:
 *         description: Error al eliminar el hospital
 */
router.delete('/:id', hospitalController.deleteHospital);

/**
 * @swagger
 * tags:
 *   name: Hospitales
 *   description: Gestión de hospitales
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Hospital:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del hospital
 *         nombre:
 *           type: string
 *           description: Nombre del hospital
 *         direccion:
 *           type: string
 *           description: Dirección del hospital
 *         urlApi:
 *           type: string
 *           description: URL de la API del hospital
 *     ConsultaData:
 *       type: object
 *       properties:
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha de la consulta
 *         diagnostico:
 *           type: string
 *         tratamiento:
 *           type: string
 *         hospitalId:
 *           type: string
 *         medicoId:
 *           type: integer
 *         pacienteId:
 *           type: integer
 */

router.post('/', hospitalController.createHospital);
router.get('/', hospitalController.getHospitales);
router.get('/:id', hospitalController.getHospitalById);
router.put('/:id', hospitalController.updateHospital);
router.delete('/:id', hospitalController.deleteHospital);

/**
 * @swagger
 * /hospitales/{hospitalId}/consultas:
 *   post:
 *     summary: Enviar datos de consulta a un hospital específico
 *     tags: [Hospitales]
 *     parameters:
 *       - in: path
 *         name: hospitalId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConsultaData'
 *     responses:
 *       200:
 *         description: Respuesta de la API del hospital
 *       404:
 *         description: Hospital no encontrado
 *       500:
 *         description: Error al comunicarse con la API del hospital
 */
router.post('/:hospitalId/consultas', hospitalController.enviarConsulta);


/**
 * @swagger
 * /hospitales/{hospitalId}/consultas:
 *   get:
 *     summary: Obtener las consultas externas asociadas a un hospital
 *     tags: [Hospitales]
 *     parameters:
 *       - in: path
 *         name: hospitalId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hospital del que se desean obtener las consultas
 *     responses:
 *       200:
 *         description: Lista de consultas externas del hospital
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   paciente:
 *                     type: string
 *                     description: Nombre del paciente
 *                   fecha:
 *                     type: string
 *                     description: Fecha de la consulta
 *                   diagnostico:
 *                     type: string
 *                     description: Diagnóstico del paciente
 *                   tratamiento:
 *                     type: string
 *                     description: Tratamiento recomendado
 *       404:
 *         description: Hospital no encontrado
 *       500:
 *         description: Error al obtener las consultas del hospital
 */
router.get('/:hospitalId/consultas', hospitalController.getConsultasExternas);

module.exports = router;
