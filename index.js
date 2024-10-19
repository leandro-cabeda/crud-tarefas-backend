const { sequelize } = require('./src/database');
const { app } = require('./src/shared/http/server');

const startServer = async () => {
  await sequelize.sync();
  app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
  });
};

startServer();
