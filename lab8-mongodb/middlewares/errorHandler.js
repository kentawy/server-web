const ApiError = require('../errors/ApiError');

module.exports = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server error';
  let errors = err.errors || [];

  // Додаткове завдання 2: Логування помилок з часом 
  const time = new Date().toISOString();
  console.error(`[${time}] Error: ${message} (Status: ${statusCode})`);

  // Обробка кастомних помилок ApiError
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } 
  // Mongoose: неправильний формат ID
  else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid id format';
    errors = [{ field: err.path, msg: 'Invalid ObjectId' }];
  }
  // Mongoose помилки валідації схеми
  else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Mongoose validation error';
    errors = Object.values(err.errors).map(e => ({
      field: e.path,
      msg: e.message
    }));
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    statusCode
  });
};