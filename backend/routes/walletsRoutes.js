const express = require('express');
const walletController = require('../controllers/walletsController');

// Define as router file.
const router = express.Router();

// Wallets routes.
/*
GET / - Liste tous les wallets
POST / - Ajoute un wallet
GET /:id - Détails d'un wallet
*/

module.exports = router;