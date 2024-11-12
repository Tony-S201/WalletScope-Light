const express = require('express');

// Controller
const TokenController = require('../controllers/tokensController');

// Middlewares
const validate = require('../middlewares/validator');
const auth = require('../middlewares/auth');

// Schema for middleware
const tokenSchema = require('../validators/tokenValidator');

// Define as express router file
const router = express.Router();

// Create an instance of TokenController
const tokenController = new TokenController();

// Tokens routes.
router.get('/all', auth, tokenController.getTokens);
router.post('/register', auth, validate(tokenSchema.create), tokenController.registerToken);
router.get('/:id', auth, tokenController.getTokenById);

module.exports = router;