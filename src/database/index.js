const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite3'
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID da tarefa.
 *           example: 1
 *         title:
 *           type: string
 *           description: O título da tarefa.
 *           example: "Estudar para o exame"
 *         priority:
 *           type: string
 *           description: A prioridade da tarefa.
 *           enum: [low, medium, high]
 *           example: "high"
 *         status:
 *           type: string
 *           description: O status da tarefa.
 *           enum: [open, inProgress, pending, completed]
 *           example: "pending"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: A data de criação da tarefa.
 *           example: "2023-10-21T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: A data da última atualização da tarefa.
 *           example: "2023-10-21T12:00:00Z"
 */
const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: true },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'open' },
  priority: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
});

module.exports = { sequelize, Task, Op };
