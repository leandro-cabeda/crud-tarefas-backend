const AppError = require('../../../shared/errors/AppError');
const { Task } = require('../../../database');

class DeleteByIdTaskService {
  async execute(id) {
    const task = await Task.findByPk(id);

    if (!task)
      throw new AppError('Tarefa não encontrada com id [ ' + id + ' ]!', 404);

    await task.destroy();
  }
}

module.exports = DeleteByIdTaskService;
