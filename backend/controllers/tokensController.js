/* Token Controller */

const TokenRepository = require('../repositories/tokenRepository');

class TokenController {
  constructor() {
    this.getTokens = this.getTokens.bind(this);
    this.registerToken = this.registerToken.bind(this);
    this.getTokenById = this.getTokenById.bind(this);
  }

  async getTokens(req, res) {
    try {
      const tokens = await TokenRepository.findAll();
      res.status(200).json({ 
        success: true,
        data: tokens
      });
    } catch (error) {
      console.error('GetTokens Error:', error);
      res.status(500).json({ 
        success: false,
        error: error.message
      });
    }
  }

  async registerToken(req, res) {
    try {
      const { name, symbol, contractAddress, network, coingecko, manualPrice } = req.body;

      const token = await TokenRepository.create({ name, symbol, contractAddress, network, coingecko, manualPrice });
      res.status(201).json({
        success: true,
        data: token
      });
    } catch (error) {
      console.error('CreateToken Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getTokenById(req, res) {
    try {
      const token = await TokenRepository.findById(req.params.id);
      
      if (!token) {
        return res.status(404).json({
          success: false,
          error: 'Token not found'
        });
      }

      res.status(200).json({
        success: true,
        data: token
      });
    } catch (error) {
      console.error('GetTokenById Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

}

module.exports = TokenController;