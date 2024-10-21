const CreateTaskService = require('../services/CreateTaskService');
const FindAllTaskService = require('../services/FindAllTaskService');
const FindByIdTaskService = require('../services/FindByIdTaskService');
const UpdateTaskService = require('../services/UpdateTaskService');
const DeleteByIdTaskService = require('../services/DeleteByIdTaskService');
const { io } = require('../../../shared/http/server');
const isValidFields = require('../../../shared/utils');

 class TaskController {

  constructor(io) {
    this.io = io;
  }

  async create(request, response) {
    const taskBody = request.body;

    // this.io.emit('taskCreated', taskBody);

    const resValidate = isValidFields(taskBody);

    if(resValidate?.length)
      return response.status(400).json({ error: resValidate });


    const createTaskService = new CreateTaskService();
    const { task } = await createTaskService.execute(taskBody);

    return response.status(201).json(task);
  }

  async findAll (request, response) {

    const findAllTaskService = new FindAllTaskService();
    const res = await findAllTaskService.execute(request.query);
    return response.status(200).json(res);
  }

  async findById (request, response) {
    const { id } = request.params;

    if(!id)
      return response.status(400).json({ error: 'Id da tarefa é obrigatório!' });

    const findByIdTaskService = new FindByIdTaskService();
    const { task } = await findByIdTaskService.execute(id);
    return response.status(200).json(task);
  }

  async update (request, response) {
    const { id } = request.params;

    if(!id)
      return response.status(400).json({ error: 'Id da tarefa é obrigatório!' });

    const resValidate = isValidFields(request.body);

    if(resValidate?.length)
      return response.status(400).json({ error: resValidate });


    const updateTaskService = new UpdateTaskService();
    const { task } = await updateTaskService.execute(id, request.body);
    return response.status(200).json(task);
  }

  async delete (request, response) {
    const { id } = request.params;
    if(!id)
      return response.status(400).json({ error: 'Id da tarefa é obrigatório!' });

    const deleteByIdTaskService = new DeleteByIdTaskService();
    await deleteByIdTaskService.execute(id);

    return response.status(204).end();
  }
}

module.exports = new TaskController(io);
