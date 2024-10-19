const AppError = require('../../../shared/errors/AppError');
const { Task } = require('../../../database');

class CreateTaskService {
  async execute(taskDto) {
    const { title, status, priority } = taskDto;

    const task = await Task.findOne({ where: { title } });

    if (task)
      throw new AppError(
        'Task com titulo [ ' + title + ' ] ja existe na base!',
      );

    const taskCreate = await Task.create({ title, status, priority });

    return { taskCreate };
  }
}

module.exports = CreateTaskService;
