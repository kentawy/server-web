const Task = require('../models/Task');
const AppError = require('../utils/AppError');

exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().populate('createdBy', 'name email');
        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (err) { next(err); }
};

exports.getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return next(new AppError('Задачу не знайдено', 404));
        res.status(200).json({ success: true, data: task });
    } catch (err) { next(err); }
};

exports.createTask = async (req, res, next) => {
    try {
        const task = await Task.create({
            ...req.body,
            createdBy: req.user._id  
        });
        res.status(201).json({ success: true, data: task });
    } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) return next(new AppError('Задачу не знайдено', 404));
        res.status(200).json({ success: true, data: task });
    } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return next(new AppError('Задачу не знайдено', 404));
        res.status(200).json({ success: true, message: 'Задачу видалено' });
    } catch (err) { next(err); }
};