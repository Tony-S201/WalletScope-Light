const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  author: { type: String, required: true },
  address: { type: String, required: true },
  name: { type: String, required: true },
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;