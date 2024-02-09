const jwt = require('jsonwebtoken');

/**
 * Middleware function for authentication.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} If authentication fails.
 */
const authMiddleware = (req, res, next) => {

  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    return res.status(401).json({ msg: 'TokenMissing' });
  }

  const token = bearerToken.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ msg: 'InvalidToken' });
  }
};

module.exports = authMiddleware;