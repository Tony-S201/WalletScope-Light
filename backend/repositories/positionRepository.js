/* Position Repository - Database Interaction */

const Position = require('../models/Position');

class PositionRepository {
  static async findAll() {
    return await Position.find()
      .populate('token')
      .populate('wallet');
  }

  static async create(positionData) {
    const position = new Position(positionData);
    return await position.save();
  }

  static async findById(id) {
    return await Position.findById(id)
      .populate('token')
      .populate('wallet');
  }

  static async update(id, updateData) {
    return await Position.findByIdAndUpdate(
      id,
      { 
        ...updateData,
        lastUpdate: Date.now()
      },
      { new: true }
    ).populate('token')
     .populate('wallet');
  }

  static async delete(id) {
    return await Position.findByIdAndDelete(id);
  }

  static async findByWallet(walletId) {
    return await Position.find({ wallet: walletId })
      .populate('token')
      .populate('wallet');
  }

  static async findStaking() {
    return await Position.find({ isStaking: true })
      .populate('token')
      .populate('wallet');
  }
}

module.exports = PositionRepository;