/* Token Model */
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  walletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  contractAddress: { type: String, required: true, unique: true },
  network: { type: String, required: true },
  coingeckoId: { type: String },
  lastKnownPrice: {
    usd: Number,
    updatedAt: Date
  },
  manualPrice: {
    usd: Number,
    updatedAt: Date
  },
  amount: { type: Number, defaultValue: 0 }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;