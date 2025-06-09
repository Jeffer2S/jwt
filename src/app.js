const express = require('express');
const cors = require('cors');
const hospitalRoutes = require('./routes/hospitalRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const especialidadRoutes = require('./routes/especialidadRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const authRoutes = require('./routes/authRoutes');
const authController = require('./controllers/authController');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const initDB = require('./config/initDB'); 
require('dotenv').config();
console.log('Tipo de initDB:', typeof initDB);
console.log('Contenido de initDB:', initDB);


const app = express();
const port = process.env.PORT || 3000;

// Middlewares
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'authorization-spring'],
};

app.use(cors(corsOptions));

app.use(express.json());

// Swagger config
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Central de Hospitales',
      version: '1.0.0',
      description: 'API para gestionar hospitales, médicos, especialidades y empleados.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    servers: [
      {
        url: `http://localhost:3000/api`,
        description: 'Servidor en Azure'
      },
    ],    
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

//  Rutas públicas (no requieren autenticación) --
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger público
app.use('/api/auth', authRoutes);

//  Middleware para proteger solo rutas privadas --
app.use((req, res, next) => {
  // Si la ruta empieza con /api-docs o /api/auth, NO protegemos --
  if (req.path.startsWith('/api-docs') || req.path.startsWith('/api/auth')) {
    return next();
  }
  // Para todas las demás rutas, verificamos el token --
  authController.verifyToken(req, res, next);
});

//  Rutas protegidas
app.use('/api/hospitales', hospitalRoutes);
app.use('/api/medicos', medicoRoutes);
app.use('/api/especialidades', especialidadRoutes);
app.use('/api/empleados', empleadoRoutes);

// Inicializar la base de datos y arrancar servidor
initDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor central escuchando en http://localhost:${port}`);
      console.log(`Documentación de Swagger disponible en http://localhost:${port}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Error al inicializar la base de datos:', err);
    process.exit(1);
  });
