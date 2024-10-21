const { sequelize } = require('./src/database');
const { server, app } = require('./src/shared/http/server');

const startServer = async () => {
  await sequelize.sync();
  server.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
  });
};

startServer();

module.exports = server;
