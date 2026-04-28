const express = require('express');
const router = express.Router();
const { getAllTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const protect = require('../middleware/protect');
const restrictTo = require('../middleware/restrictTo');
const validateRequest = require('../middleware/validateRequest');
const { taskSchema } = require('../validators/taskValidator');

router.get('/', getAllTasks);
router.get('/:id', getTask);

router.post('/', protect, validateRequest(taskSchema), createTask);
router.put('/:id', protect, validateRequest(taskSchema), updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;