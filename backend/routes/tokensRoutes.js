const express = require('express');

// Controller
const TokenController = require('../controllers/tokensController');

// Middleware
const validate = require('../middlewares/validator');

// Schema for middleware
const tokenSchema = require('../validators/tokenValidator');

// Define as express router file
const router = express.Router();

// Create an instance of TokenController
const tokenController = new TokenController();

// Tokens routes.
router.get('/all', tokenController.getTokens);
router.post('/register', validate(tokenSchema.create), tokenController.registerToken);
router.get('/:id', tokenController.getTokenById);

module.exports = router;