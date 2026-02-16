const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  createContact,
  // getAllContacts,
  // getContactById,
  // updateContactStatus,
  // deleteContact,
} = require('../controllers/contactController');

// Validation middleware
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
];

// Validation error handler middleware
const handleValidationErrors = (req, res, next) => {
  const { validationResult } = require('express-validator');
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((error) => error.msg),
    });
  }
  next();
};

// Public routes
router.post('/', contactValidation, handleValidationErrors, createContact);

// Admin routes (you can add authentication middleware here)
// router.get('/', getAllContacts);
// router.get('/:id', getContactById);
// router.patch('/:id', updateContactStatus);
// router.delete('/:id', deleteContact);

module.exports = router;
