/* Wallet Repository - Database Interaction */

const Wallet = require('../models/Wallet');

class WalletRepository {
  static async findAll() {
    return await Wallet.find();
  }

  static async create(walletData) {
    const wallet = new Wallet(walletData);
    return await wallet.save();
  }

  static async findById(id) {
    return await Wallet.findById(id);
  }

  static async findByUser(address) {
    return await Wallet.find({ author: address });
  }
}

module.exports = WalletRepository;