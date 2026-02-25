require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Підключення нових модулів
const ApiError = require('./errors/ApiError');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'АРІ для роботи з постами та коментарями',
    endpoints: { posts: '/api/posts', comments: '/api/comments' }
  });
});

// Завдання 2.5: Middleware для 404 маршрутів
app.use((req, res, next) => {
  next(ApiError.notFound('Маршрут не знайдено'));
});

// Централізована обробка помилок 
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущено на порту ${PORT}`));