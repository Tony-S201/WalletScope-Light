const express = require('express');
const WalletController = require('../controllers/walletsController');
const validate = require('../middlewares/validator');
const walletSchema = require('../validators/walletValidator');

// Define as router file.
const router = express.Router();

// Create an instance of WalletController.
const walletController = new WalletController();

// Wallets routes.
router.get('/all', walletController.getWallets);
router.post('/register', validate(walletSchema.create), walletController.registerWallet);
router.get('/:id', walletController.getWalletById);

module.exports = router;