const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route Register
router.post('/register', authController.register);

// Route Login
router.post('/login', authController.login);

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working!' });
});

module.exports = router;