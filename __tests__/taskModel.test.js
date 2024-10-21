const { sequelize, Task } = require('../src/database');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Task Modelo', () => {
  it('Criar task de modelo com sucesso', async () => {
    const taskData = {
      title: 'Estudar para o exame',
      priority: 'high',
      status: 'pending',
    };

    const task = await Task.create(taskData);

    expect(task.id).toBeDefined();
    expect(task.title).toBe(taskData.title);
    expect(task.priority).toBe(taskData.priority);
    expect(task.status).toBe(taskData.status);
  });

  it('Gerar um erro se o título estiver faltando', async () => {
    await expect(Task.create({
      priority: 'high',
      status: 'pending',
    })).rejects.toThrow();
  });
});
