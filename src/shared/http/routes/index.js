const { Router } = require('express');
const router = Router();

const taskRouter = require('../../../modules/tasks/routes/task.route');

router.get('/', (req, res) => {
  res.status(200).json({ status: 'Success', message: 'Welcome Api Tasks!' });
});

router.use('/tasks', taskRouter);

module.exports = router;
