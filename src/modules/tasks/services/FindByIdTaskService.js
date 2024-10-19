const AppError = require('../../../shared/errors/AppError');
const { Task } = require('../../../database');

class FindByIdTaskService {
  async execute(id) {
    const task = await Task.findByPk(id);

    if (!task)
      throw new AppError('Tarefa não encontrada com id [ ' + id + ' ]!', 404);

    return { task };

  }
}

module.exports = FindByIdTaskService;
