const User = require('../models/User.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.getMe = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  console.log("called")
  res.status(200).json({
    status: 'success',
    data: req.user
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);
  
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  const filteredBody = {
    name: req.body.name || user.name,
    email: req.body.email || user.email,
    phoneNumber: req.body.phoneNumber || user.phoneNumber,
    specialization: req.body.specialization || user.specialization,
    address: req.body.address || user.address
  };

  await user.update(filteredBody);

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.destroy({ where: { id: req.user.id } });

  res.status(204).json({
    status: 'success',
    data: null
  });
});