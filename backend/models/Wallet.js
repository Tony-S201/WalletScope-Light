const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  network: { type: String, required: true }
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;