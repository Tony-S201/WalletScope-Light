const express = require('express');

// Controller
const PositionController = require('../controllers/positionsController');

// Middlewares
const validate = require('../middlewares/validator');
const authMiddleware = require('../middlewares/auth');

// Schema for middleware
const positionSchema = require('../validators/positionValidator');

// Define as express router file.
const router = express.Router();

// Create a new instance of position controller
const positionController = new PositionController();

/* Routes */

// Get all positions
router.get('/', authMiddleware, positionController.getPositions);

// Create new position
router.post('/', authMiddleware, validate(positionSchema), positionController.createPosition);

// Get all staking positions
router.get('/staking', authMiddleware, positionController.getStakingPositions);

// Get specific position by ID
router.get('/:id', authMiddleware, positionController.getPositionById);

// Update position
router.put('/:id', authMiddleware, validate(positionSchema), positionController.updatePosition);

// Delete position
router.delete('/:id', authMiddleware, positionController.deletePosition);

// Get all positions for a specific wallet
router.get('/wallet/:walletId', authMiddleware, positionController.getPositionsByWallet);

module.exports = router;
