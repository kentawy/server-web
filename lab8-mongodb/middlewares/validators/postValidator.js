const { body, param, query } = require('express-validator');

exports.createPostRules = [
  // Завдання 1.1 (body) + 1.3 (trim) + 2.5 (уніфікація повідомлень)
  body('title').trim().notEmpty().withMessage('Field title is required') 
    .isLength({ min: 3, max: 200 }).withMessage('title length must be 3-200'),
  
  body('content').trim().notEmpty().withMessage('Field content is required')
    .isLength({ min: 10 }).withMessage('content min length is 10'),
  
  body('author').trim().notEmpty().withMessage('Field author is required')
    .isLength({ min: 2, max: 100 }).withMessage('author length must be 2-100'),
  
  // Завдання 2.4 (максимум 10 тегів) - кастомна перевірка
  body('tags').optional().isArray().withMessage('tags must be an array')
    .custom(tags => tags.length <= 10).withMessage('Maximum 10 tags allowed'),
  
  body('tags.*').optional().isString().withMessage('each tag must be a string').trim()
];

exports.updatePostRules = [
  // Завдання 1.1 (params) + 2.5 (уніфіковане повідомлення про ID)
  param('id').isMongoId().withMessage('Invalid ID format'),
  
  body('title').optional().trim().isLength({ min: 3, max: 200 }).withMessage('title length must be 3-200'),
  body('content').optional().trim().isLength({ min: 10 }).withMessage('content min length is 10'),
  
  // Завдання 2.4 повторно для оновлення
  body('tags').optional().isArray().custom(tags => tags.length <= 10).withMessage('Maximum 10 tags allowed'),
  body('tags.*').optional().isString().trim()
];

exports.getPostsRules = [
  // Завдання 1.1 (query) + 1.3 (toInt)
  query('page').optional().toInt().isInt({ min: 1 }).withMessage('page must be >= 1'),
  query('limit').optional().toInt().isInt({ min: 1, max: 100 }).withMessage('limit must be 1-100')
];

exports.searchPostsRules = [
  // Завдання 1.1 (query) + 1.3 (trim) + 2.5
  query('q').trim().notEmpty().withMessage('Field q is required')
    .isLength({ min: 2 }).withMessage('q min length is 2')
];

exports.mongoIdParamRule = [
  param('id').isMongoId().withMessage('Invalid ID format')
];