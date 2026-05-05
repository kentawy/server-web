require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const AppError = require('./utils/AppError');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://127.0.0.1:5500',
    credentials: true
}));

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    next(new AppError(`Маршрут ${req.originalUrl} не знайдено`, 404));
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        success: false,
        message: err.message || 'Внутрішня помилка сервера'
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => console.error('Database error:', err));