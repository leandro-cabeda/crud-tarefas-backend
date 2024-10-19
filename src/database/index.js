const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite3'
});

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: true },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
  priority: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
});

module.exports = { sequelize, Task, Op };
