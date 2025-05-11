const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User.model');
const AppError = require('../utils/appError');

exports.authenticate = async (req, res, next) => {
  try {
    // 1. Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return next(new AppError('Authorization header missing or invalid', 401));
    }
    const token = authHeader.split(' ')[1];

    console.log("Token received:", token);  // Log the token to see what is being passed

    // 2. Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
    console.log("Decoded token:", decoded);  // Log the decoded token

    // 3. Validate payload contains ID
    if (!decoded.id) {
      throw new Error('Token payload missing user ID');
    }

    // 4. Get user (only essential fields)
    const currentUser = await User.findByPk(decoded.id, {
      attributes: ['id', 'passwordChangedAt']
    });

    console.log("User fetched from DB:", currentUser);  // Log the user fetched from the DB

    if (!currentUser) {
      return next(new AppError('User no longer exists', 401));
    }

    // 5. Attach user to request
    req.user = currentUser;
    next();

  } catch (err) {
    console.error('JWT Error:', err.name, err.message);
    
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Token expired', 401));
    }
    if (err.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token', 401));
    }
    
    return next(new AppError('Authentication failed', 401));
  }
};


exports.restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    // Verify user exists and has required role
    if (!req.user?.role || !allowedRoles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission for this action', 403)
      );
    }
    next();
  };
};