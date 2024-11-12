const User = require('../models/User');

class UserRepository {
  static async findByAddress(address) {
    return await User.findOne({ address });
  }

  static async create(userData) {
    const user = new User(userData);
    return await user.save();
  }
}

module.exports = UserRepository;