const express = require('express');

// Controller
const TokenController = require('../controllers/tokensController');

// Middlewares
const validate = require('../middlewares/validator');
const authMiddleware = require('../middlewares/auth');

// Schema for middleware
const tokenSchema = require('../validators/tokenValidator');

// Define as express router file
const router = express.Router();

// Create an instance of TokenController
const tokenController = new TokenController();

// Tokens routes.
router.get('/all', authMiddleware, tokenController.getTokens);
router.post('/register', authMiddleware, validate(tokenSchema.create), tokenController.registerToken);
router.get('/:id', authMiddleware, tokenController.getTokenById);

module.exports = router;