const { Router } = require('express');
const TaskController = require('../controllers/TaskController');

const router = Router();

const taskController = new TaskController();

router.post(
  '/',
  taskController.create,
);

router.get(
  '/',
  taskController.findAll,
);

router.get(
  '/:id',
  taskController.findById,
);

router.put('/:id', taskController.update);


router.delete('/:id', taskController.delete);

module.exports = router;
