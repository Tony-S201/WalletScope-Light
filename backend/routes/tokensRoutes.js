const express = require('express');
const tokensController = require('../controllers/tokensController');

// Define as express router file.
const router = express.Router();

// Tokens router.
/*
GET / - Liste tous les tokens
POST / - Ajoute un token
GET /:id - Détails d'un token
PUT /:id - Met à jour un token
*/

module.exports = router;