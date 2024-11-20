const express = require('express');

// Controller
const WalletController = require('../controllers/walletsController');

// Middlewares
const validate = require('../middlewares/validator');
const authMiddleware = require('../middlewares/auth');

// Schema for middleware
const walletSchema = require('../validators/walletValidator');

// Define as router file
const router = express.Router();

// Create an instance of WalletController
const walletController = new WalletController();

// Wallets routes.
router.get('/all', authMiddleware, walletController.getWallets);
router.post('/register', authMiddleware, validate(walletSchema.create), walletController.registerWallet);
router.get('/:id', authMiddleware, walletController.getWalletById);
router.get('/user/:userAddress', authMiddleware, walletController.getWalletByUser);

module.exports = router;