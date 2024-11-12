const express = require('express');

// Controller
const PositionController = require('../controllers/positionController');

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
router.get('/positions', auth, positionController.getPositions);

// Create new position
router.post('/positions', auth, validate(positionSchema), positionController.createPosition);

// Get specific position by ID
router.get('/positions/:id', auth, positionController.getPositionById);

// Update position
router.put('/positions/:id', auth, validate(positionSchema), positionController.updatePosition);

// Delete position
router.delete('/positions/:id', auth, positionController.deletePosition);

// Get all positions for a specific wallet
router.get('/wallets/:walletId/positions', auth, positionController.getPositionsByWallet);

// Get all staking positions
router.get('/positions/staking', auth, positionController.getStakingPositions);

module.exports = router;
