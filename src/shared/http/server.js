const express = require('express');
const session = require('express-session');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  },
  transports: ['websocket'],
});
const AppError = require('../errors/AppError');
const routes = require('./routes');
const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Tarefas',
      version: '1.0.0',
      description: 'API para CRUD de tarefas com sincronização em tempo real',
      contact: {
        name: 'Leandro Cabeda Rigo',
        url: 'https://github.com/leandro-cabeda?tab=repositories',
        email: 'leandro.cabeda@hotmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/tasks',
      },
    ],
  },
  apis: ['./src/modules/tasks/routes/*.js'],
  swaggerDefinition: {
    schemes: ['http'],
  }
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = process.env.Port || 3000;

io.on('connection', (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.on('taskCreated', (task) => {
    console.log("io: socket on taskCreated: " + task);
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected');
  });
});


app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

app.use(routes);

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      status: 'Error',
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
});

app.set('port', port);

module.exports = {
  app,
  server,
  io,
};
