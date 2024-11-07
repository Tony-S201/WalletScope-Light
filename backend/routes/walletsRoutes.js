const express = require('express');
const walletController = require('../controllers/walletsController');

// Define as router file.
const router = express.Router();

// Wallets routes.
router.get('/all', walletController.getWallets);
router.post('/register', walletController.registerWallet);
router.get('/:id', walletController.getWalletById);

module.exports = router;