const AppError = require('../../../shared/errors/AppError');
const { Task, Op } = require('../../../database');

class FindAllTaskService {
  async execute(query) {

    const {
      title,
      status,
      priority,
      createdAt,
      sortBy = 'createdAt',
      sortOrder = 'ASC',
      page = 1,
      pageSize = 10,
    } = query;

    const queryOptions = {
      where: {},
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize),
    };

    if (title) {
      queryOptions.where.title = { [Op.like]: `%${title}%` };
    }

    if (status) {
      queryOptions.where.status = status;
    }

    if (priority) {
      queryOptions.where.priority = priority;
    }

    if (createdAt) {
      queryOptions.where.createdAt = {
        [Op.gte]: new Date(createdAt),
      }
    }

    try {
      const tasks = await Task.findAndCountAll(queryOptions);
      const totalPages = Math.ceil(tasks.count / pageSize);
      const response = {
        tasks: tasks.rows,
        totalItems: tasks.count,
        totalPages,
        currentPage: parseInt(page),
      };

      return response;
    } catch (error) {
      console.log(error);
      throw new AppError(
        'Erro ao buscar tarefas! Error: ' + JSON.stringify(error),
        500,
      );
    }
  }
}

module.exports = FindAllTaskService;
