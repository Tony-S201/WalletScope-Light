// controllers/authController.js
const jwt = require('jsonwebtoken');
const { verifyMessage } = require('viem');
const UserRepository = require('./../repositories/userRepository');

class AuthController {
  async login(req, res) {
    try {
      const { address, signature, timestamp } = req.body;

      // Verify required fields
      if (!address || !signature || !timestamp) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields'
        });
      }

      // Check if timestamp is not too old (5 min max)
      const currentTimestamp = Date.now();
      if (Math.abs(currentTimestamp - timestamp) > 5 * 60 * 1000) {
        return res.status(401).json({
          success: false,
          error: 'Login request expired'
        });
      }

      // Verify signature using viem
      const isValidSignature = await verifyMessage({
        address: address,
        message: `Login to App at Timestamp: ${timestamp}`,
        signature
      });

      if (!isValidSignature) {
        return res.status(401).json({
          success: false,
          error: 'Invalid signature'
        });
      }

      // Find or create user
      let user = await UserRepository.findByAddress(address.toLowerCase());
      if (!user) {
        user = await UserRepository.create({
          address: address.toLowerCase()
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          address: user.address,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h'
        }
      );

      // Set token in HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // false for dev environment
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000 // 24h in ms
      });

      return res.status(200).json({
        success: true,
        data: {
          user,
          token
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error during login'
      });
    }
  }
}

module.exports = AuthController;