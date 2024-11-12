const express = require('express');

// Controller
const AuthController = require('../controllers/authController');

// Middlewares
const validate = require('../middlewares/validator');

// Model Schema
const authSchema = require('../validators/authValidator');

// Define as router
const router = express.Router();

// Create a new instance of controller
const authController = new AuthController();

// Routes
router.post('/login', validate(authSchema.login), authController.login);

module.exports = router;