const express = require('express');
const router = express.Router();
const controller = require('../controllers/empleadoController');

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: Gestión de empleados
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Empleado:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del empleado
 *         nombre:
 *           type: string
 *           description: Nombre del empleado
 *         cargo:
 *           type: string
 *           description: Cargo del empleado
 *         hospital_id:
 *           type: integer
 *           description: ID del hospital asociado
 */

/**
 * @swagger
 * /empleados:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       500:
 *         description: Error del servidor
 */
router.post('/', controller.createEmpleado);

/**
 * @swagger
 * /empleados:
 *   get:
 *     summary: Obtener todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 *       500:
 *         description: Error del servidor
 */
router.get('/', controller.getEmpleados);

/**
 * @swagger
 * /empleados/hospital/{hospitalId}:
 *   get:
 *     summary: Obtener empleados por hospital
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: hospitalId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del hospital
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Hospital no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/hospital/:hospitalId', controller.getEmpleadosPorHospital);

/**
 * @swagger
 * /empleados/{id}:
 *   put:
 *     summary: Actualizar un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       200:
 *         description: Empleado actualizado
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', controller.updateEmpleado);

/**
 * @swagger
 * /empleados/{id}:
 *   delete:
 *     summary: Eliminar un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado eliminado
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', controller.deleteEmpleado);

module.exports = router;