const AppError = require('../../../shared/errors/AppError');
const { Task } = require('../../../database');

class UpdateTaskService {
  async execute(id, taskDto) {
    const { title, status, priority } = taskDto;

    const task = await Task.findByPk(id);

    if (!task)
      throw new AppError('Tarefa não encontrada com id [ ' + id + ' ]!', 404);

    const taskExist = await Task.findOne({ where: { title } });

    if (taskExist && taskExist.id !== id)
      throw new AppError('Esta task com o titulo [ ' + title + ' ] já existe na base');

    await task.update({ title, status, priority });

    return { task };
  }
}

module.exports = UpdateTaskService;
