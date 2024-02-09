const jwt = require('jsonwebtoken');
const User = require("../models/User");

/**
 * Middleware function to verify user roles.
 *
 * @param {Array} allowedRoles - An array specifying the allowed roles.
 * @returns {Function} - A middleware function that verifies if user has the required role.
 */
const verifyRole = (allowedRoles) => {
  return async (req, res, next) => {
    const bearerToken = req.header('Authorization');

    if (!bearerToken) {
      return res.status(401).json({msg: 'TokenMissing'});
    }
    const token = bearerToken.split(' ')[1];
    try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.userId)
          .populate("role");

      console.log(user.role.actions, allowedRoles)

      const isAllowed = allowedRoles.every(role => user.role.actions.includes(role));
      if (isAllowed) {
        next();
      } else {
        return res.status(403).json({message: 'No tienes permiso para realizar esta acción'});
      }
    } catch (error) {
      return res.status(401).json({message: 'No autenticado'});
    }
  };
};


module.exports = verifyRole;
