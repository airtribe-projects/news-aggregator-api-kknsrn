// Authentication routes
const express = require('express');
const router = express.Router();
const { register, login, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateUserInput, validateEmail, validatePassword } = require('../middleware/validation');

// Register route
router.post('/register', validateUserInput, validateEmail, validatePassword, register);

// Login route
router.post('/login', validateEmail, validatePassword, login);

// Get current user
router.get('/me', protect, getMe);

// Logout route
router.post('/logout', protect, logout);

module.exports = router;
