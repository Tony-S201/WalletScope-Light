const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if there is a bearer token
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No Token'
      });
    }

    // Get the bearer token
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Token not valide'
      });
    }

    // Decode the token with jwt verify method
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch(error) {
    return res.status(401).json({
      success: false,
      error: 'Token not valide or expired'
    });
  }
};

module.exports = auth;