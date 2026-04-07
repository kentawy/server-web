const express = require('express');
const router = express.Router();
const { getAllTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const protect = require('../middleware/protect');
const restrictTo = require('../middleware/restrictTo');

router.get('/', getAllTasks);
router.get('/:id', getTask);

// Тільки для логінованих
router.post('/', protect, createTask);
router.put('/:id', protect, updateTask);

// Тільки для адмінів
router.delete('/:id', protect, restrictTo('admin'), deleteTask);

module.exports = router;