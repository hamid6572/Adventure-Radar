const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const { body } = require('express-validator');
router.post(
  '/signup',
  [
    body('username').trim().not().isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Validation failed!')
      .not()
      .isEmpty()
      .normalizeEmail(),
    body('password').not().isEmpty().trim().isLength({ min: 3 }),
  ],
  authController.signup
);
router.post('/login', authController.login);
router.post('/forgetPassword', authController.forgetPassword);

module.exports = router;
