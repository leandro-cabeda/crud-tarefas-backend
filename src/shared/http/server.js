const express = require('express');
const session = require('express-session');
const AppError = require('../errors/AppError');
const routes = require('./routes');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.Port || 3000;

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
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
  io,
};
