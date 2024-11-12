const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/userRepository');
const { verifyMessage } = require('viem');

class AuthController {
  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req, res) {
    try {
      const { address, signature } = req.body;

      // Use a timestamp as nonce
      const currentTimeStamp = Date.now();
      const message = `Login to App at Timestamp: ${currentTimeStamp}`;

      // Check if the timestamp is not old (5 min max)
      const providedTimestamp = parseInt(message.split('timestamp: ')[1]);
      if (Math.abs(currentTimeStamp - providedTimestamp) > 5 * 60 * 1000) {
        return res.status(401).json({
          success: false,
          error: 'Login request expired'
        });
      }

      // Check signature using viem verify function
      const isValidSignature = await verifyMessage({
        address: address,
        message: message,
        signature
      })

      if (!isValidSignature) {
        return res.status(401).json({
          success: false,
          error: 'Invalid Signature'
        });
      }

      // Create or get the user
      let user = await UserRepository.findByAddress(address);
      if (!user) {
        user = await UserRepository.create({ address });
      }

      // Generate JWT token$
      const token = jwt.sign(
        {
          userId: user._id,
          address: user.address
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(200).json({
        success: true,
        data: {
          token,
          user
        }
      });
    } catch(error) {
      console.log('Login Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = AuthController;