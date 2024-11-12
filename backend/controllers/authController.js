const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/userRepository');
const { verifyMessage } = require('viem');

class AuthController {
  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req, res) {
    const { address, signature } = req.body;

    // Check signature using viem verify function
    const isValidSignature = await verifyMessage({
      address: address,
      message: '',
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

module.exports = AuthController;