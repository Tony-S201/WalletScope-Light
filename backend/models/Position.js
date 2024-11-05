const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  token: { type: mongoose.Schema.Types.ObjectId, ref: 'Token' },
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  amount: { type: Number, required: true },
  isStaking: { type: Boolean, default: false },
  stakingPlatform: {
    name: String,
    apy: Number,
    lockupPeriod: Number // days unit
  },
  notes: String,
  lastUpdate: { type: Date, default: Date.now }
});

const Position = mongoose.model('Position', positionSchema);

module.exports = Position;