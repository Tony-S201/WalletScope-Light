const express = require('express');
const positionController = require('../controllers/positionsController');

// Define as express router file.
const router = express.Router();

// Positions routes.

/* 
GET / - List positions
POST / - Add position
PUT /:id - Update position
DELETE /:id - Delete position 
*/

module.exports = router;
