/* Wallet Controller */

const WalletRepository = require('../repositories/walletRepository');

class WalletController {
  constructor() {
    this.getWallets = this.getWallets.bind(this);
    this.registerWallet = this.registerWallet.bind(this);
    this.getWalletById = this.getWalletById.bind(this);
  }

  async getWallets(req, res) {
    try {
      const wallets = await WalletRepository.findAll();
      res.status(200).json({ 
        success: true,
        data: wallets
      });
    } catch (error) {
      console.error('GetWallets Error:', error);
      res.status(500).json({ 
        success: false,
        error: error.message
      });
    }
  }

  async registerWallet(req, res) {
    try {
      const { author, name, address } = req.body;

      const wallet = await WalletRepository.create({ author, name, address });
      res.status(201).json({
        success: true,
        data: wallet
      });
    } catch (error) {
      console.error('CreateWallet Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getWalletById(req, res) {
    try {
      const wallet = await WalletRepository.findById(req.params.id);
      
      if (!wallet) {
        return res.status(404).json({
          success: false,
          error: 'Wallet not found'
        });
      }

      res.status(200).json({
        success: true,
        data: wallet
      });
    } catch (error) {
      console.error('GetWalletById Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getWalletByUser(req, res) {
    try {
      const wallets = await WalletRepository.findByUser(req.params.userAddress);
      
      if (!wallets) {
        return res.status(404).json({
          success: false,
          error: 'User Wallets not found'
        });
      }

      res.status(200).json({
        success: true,
        data: wallets
      });
    } catch (error) {
      console.error('GetWalletById Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

}

module.exports = WalletController;