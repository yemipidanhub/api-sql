const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User.model');
const AppError = require('../utils/appError');

exports.authenticate = async (req, res, next) => {
  try {
    // Skip authentication for OPTIONS preflight requests
    if (req.method === 'OPTIONS') return next();

    // 1. Check for token
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      return next(new AppError('Please log in to access', 401));
    }

    // 2. Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const currentUser = await User.findByPk(decoded.id);
    if (!currentUser) {
      return next(new AppError('User no longer exists', 401));
    }

    // 4. Attach user to request
    req.user = currentUser;
    next();

  } catch (err) {
    // Handle token errors
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Session expired. Please log in again', 401));
    }
    if (err.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token. Please log in again', 401));
    }
    next(err);
  }
};

// Completely open authorization (only checks authentication)
exports.authorize = (req, res, next) => next(); // No restrictions


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