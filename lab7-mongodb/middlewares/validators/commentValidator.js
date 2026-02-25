const { body, param } = require('express-validator');

exports.createCommentRules = [
  // Завдання 1.1 + 2.5
  body('postId').notEmpty().withMessage('Field postId is required')
    .isMongoId().withMessage('Invalid ID format'),
  
  body('author').trim().notEmpty().withMessage('Field author is required')
    .isLength({ min: 2, max: 100 }).withMessage('author length must be 2-100'),
  
  body('content').trim().notEmpty().withMessage('Field content is required')
    .isLength({ min: 1, max: 1000 }).withMessage('content length must be 1-1000')
];

exports.updateCommentRules = [
  param('id').isMongoId().withMessage('Invalid ID format'), // Завдання 2.5
  body('content').trim().notEmpty().withMessage('Field content is required')
    .isLength({ min: 1, max: 1000 }).withMessage('content length must be 1-1000')
];

exports.deleteCommentRules = [
  param('id').isMongoId().withMessage('Invalid ID format') // Завдання 2.5
];

exports.postIdParamRules = [
  param('postId').isMongoId().withMessage('Invalid ID format') // Завдання 2.5
];