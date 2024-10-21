const AppError = require('../../../shared/errors/AppError');
const { Task } = require('../../../database');

class UpdateTaskService {
  async execute(id, taskDto) {
    const { title, status, priority } = taskDto;

    const taskFind = await Task.findByPk(Number(id));

    if (!taskFind)
      throw new AppError('Tarefa não encontrada com id [ ' + id + ' ]!', 404);

    const taskExist = await Task.findOne({ where: { title } });

    if (taskExist && taskExist?.id != Number(id))
      throw new AppError('Esta task com o titulo [ ' + title + ' ] já existe na base');

    const task = await Task.update({ title, status, priority }, { where: { id: Number(id) } });

    return { task };
  }
}

module.exports = UpdateTaskService;
