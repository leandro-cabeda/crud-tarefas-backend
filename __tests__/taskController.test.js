const request = require('supertest');
const app = require('../index');

describe('Task API', () => {
  let taskId;

  beforeAll(async () => {
    const createdTask = await request(app).post('/tasks').send({
      title: 'Tarefa a ser atualizada',
      priority: 'medium',
      status: 'pending',
    });

    taskId = createdTask.body.id;
  });

  it('Gostaria criar uma nova tarefa', async () => {
    const res = await request(app).post('/tasks').send({
      title: 'Nova Tarefa',
      priority: 'medium',
      status: 'pending',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Nova Tarefa');
  });

  it('Gostaria de buscar todas as tarefas', async () => {
    const res = await request(app).get('/tasks');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  it('Gostaria de buscar uma tarefa pelo id criado', async () => {
    const createdTask = await request(app).post('/tasks').send({
      title: 'Tarefa para buscar',
      priority: 'medium',
      status: 'pending',
    });

    const res = await request(app).get(`/tasks/${createdTask.body.id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Tarefa para buscar');
  });

  it('Gostaria de deletar uma tarefa pelo id criado', async () => {
    const task = await request(app).post('/tasks').send({
      title: 'Tarefa a ser excluída',
      priority: 'medium',
      status: 'pending',
    });

    const res = await request(app).delete(`/tasks/${task.body.id}`);

    expect(res.statusCode).toEqual(204);
  });

  it('Gostaria de atualizar uma tarefa pelo id criado', async () => {
    const createdTask = await request(app).post('/tasks').send({
      title: 'Tarefa a ser atualizada',
      priority: 'medium',
      status: 'pending',
    });

    const taskId = createdTask.body.id;

    const res = await request(app).put(`/tasks/${taskId}`).send({
      title: 'Tarefa atualizada',
      priority: 'high',
      status: 'completed',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', taskId);
    expect(res.body.title).toBe('Tarefa atualizada');
    expect(res.body.priority).toBe('high');
    expect(res.body.status).toBe('completed');
  });

  it('Gostaria de buscar uma tarefa inexistente com status 404 que não existe', async () => {
    const res = await request(app).put('/tasks/999999').send({
      title: 'Tarefa inexistente',
      priority: 'high',
      status: 'completed',
    });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty(
      'message',
      'Tarefa não encontrada com id [ ' + 999999 + ' ]!',
    );
  });
});
