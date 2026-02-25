const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  
  // Завдання 1.2 Якщо є помилки, повертаємо 400 і список помилок
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      // Форматування списку помилок під один стиль (Завдання 2.5)
      errors: errors.array().map(e => ({ field: e.path, msg: e.msg })),
      statusCode: 400
    });
  }
  next();
};