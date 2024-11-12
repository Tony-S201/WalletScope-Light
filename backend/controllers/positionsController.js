/* Position Controller */

const PositionRepository = require('../repositories/positionRepository');

class PositionController {
  constructor() {
    this.getPositions = this.getPositions.bind(this);
    this.createPosition = this.createPosition.bind(this);
    this.getPositionById = this.getPositionById.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.deletePosition = this.deletePosition.bind(this);
    this.getPositionsByWallet = this.getPositionsByWallet.bind(this);
    this.getStakingPositions = this.getStakingPositions.bind(this);
  }

  async getPositions(req, res) {
    try {
      const positions = await PositionRepository.findAll();
      res.status(200).json({ 
        success: true,
        data: positions
      });
    } catch (error) {
      console.error('GetPositions Error:', error);
      res.status(500).json({ 
        success: false,
        error: error.message
      });
    }
  }

  async createPosition(req, res) {
    try {
      const { token, wallet, amount, isStaking, stakingPlatform, notes } = req.body;
      
      const position = await PositionRepository.create({
        token,
        wallet,
        amount,
        isStaking,
        stakingPlatform,
        notes
      });

      res.status(201).json({
        success: true,
        data: position
      });
    } catch (error) {
      console.error('CreatePosition Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getPositionById(req, res) {
    try {
      const position = await PositionRepository.findById(req.params.id);
      
      if (!position) {
        return res.status(404).json({
          success: false,
          error: 'Position not found'
        });
      }

      res.status(200).json({
        success: true,
        data: position
      });
    } catch (error) {
      console.error('GetPositionById Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async updatePosition(req, res) {
    try {
      const { amount, isStaking, stakingPlatform, notes } = req.body;
      const position = await PositionRepository.update(req.params.id, {
        amount,
        isStaking,
        stakingPlatform,
        notes
      });

      if (!position) {
        return res.status(404).json({
          success: false,
          error: 'Position not found'
        });
      }

      res.status(200).json({
        success: true,
        data: position
      });
    } catch (error) {
      console.error('UpdatePosition Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async deletePosition(req, res) {
    try {
      const position = await PositionRepository.delete(req.params.id);
      
      if (!position) {
        return res.status(404).json({
          success: false,
          error: 'Position not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Position deleted successfully'
      });
    } catch (error) {
      console.error('DeletePosition Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getPositionsByWallet(req, res) {
    try {
      const positions = await PositionRepository.findByWallet(req.params.walletId);
      res.status(200).json({
        success: true,
        data: positions
      });
    } catch (error) {
      console.error('GetPositionsByWallet Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getStakingPositions(req, res) {
    try {
      const stakingPositions = await PositionRepository.findStaking();
      res.status(200).json({
        success: true,
        data: stakingPositions
      });
    } catch (error) {
      console.error('GetStakingPositions Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = PositionController;
