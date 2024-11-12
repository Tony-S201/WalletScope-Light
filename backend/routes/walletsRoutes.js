const express = require('express');

// Controller
const WalletController = require('../controllers/walletsController');

// Middlewares
const validate = require('../middlewares/validator');
const auth = require('../middlewares/auth');

// Schema for middleware
const walletSchema = require('../validators/walletValidator');

// Define as router file
const router = express.Router();

// Create an instance of WalletController
const walletController = new WalletController();

// Wallets routes.
router.get('/all', auth, walletController.getWallets);
router.post('/register', auth, validate(walletSchema.create), walletController.registerWallet);
router.get('/:id', auth ,walletController.getWalletById);
router.get('/user/:userAddress', auth, walletController.getWalletByUser);

module.exports = router;