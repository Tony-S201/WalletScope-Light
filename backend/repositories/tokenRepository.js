/* Wallet Repository - Database Interaction */

const Token = require('../models/Token');

class TokenRepository {
  static async findAll() {
    return await Token.find();
  }

  static async create(tokenData) {
    const token = new Token(tokenData);
    return await token.save();
  }

  static async findById(id) {
    return await Token.findById(id);
  }
}

module.exports = TokenRepository;