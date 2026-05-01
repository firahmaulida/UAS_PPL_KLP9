const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// 🔥 pastikan ini function
router.post('/register', authController.register);

module.exports = router;