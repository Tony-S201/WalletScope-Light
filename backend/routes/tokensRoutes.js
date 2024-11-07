const express = require('express');
const tokensController = require('../controllers/tokensController');

// Define as express router file.
const router = express.Router();

// Tokens routes.
router.get('/all', tokensController.getTokens);
//router.post('/register', walletController.registerWallet);
//router.get('/:id', walletController.getWalletById);

module.exports = router;