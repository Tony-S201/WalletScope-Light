const express = require('express');

// Controller
const PositionController = require('../controllers/positionsController');

// Middlewares
const validate = require('../middlewares/validator');
const auth = require('../middlewares/auth');

// Schema for middleware
const positionSchema = require('../validators/positionValidator');

// Define as express router file.
const router = express.Router();

// Create a new instance of position controller
const positionController = new PositionController();

/* Routes */

// Get all positions
router.get('/', auth, positionController.getPositions);

// Create new position
router.post('/', auth, validate(positionSchema), positionController.createPosition);

// Get all staking positions
router.get('/staking', auth, positionController.getStakingPositions);

// Get specific position by ID
router.get('/:id', auth, positionController.getPositionById);

// Update position
router.put('/:id', auth, validate(positionSchema), positionController.updatePosition);

// Delete position
router.delete('/:id', auth, positionController.deletePosition);

// Get all positions for a specific wallet
router.get('/wallet/:walletId', auth, positionController.getPositionsByWallet);

module.exports = router;
