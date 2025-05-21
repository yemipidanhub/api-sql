const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");
const User = require("../models/User.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Modified to include role in the token
const signToken = (id, role) => {
  return jwt.sign({
    id: user.id,
    role: user.role  // Include role in payload
  }, 
  process.env.JWT_SECRET, 
  {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user.id, role: user.role }, // ✅ Include role too
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
}

  // console.log("JWT SECRET", process.env.JWT_SECRET)

exports.signup = catchAsync(async (req, res, next) => {
  const {
    name,
    email,
    phoneNumber,
    password,
    role = 'user', // Default role
    specialization,
    licenseType,
    licenseBody,
    licenseNumber,
    state,
    userLGA,
    address,
  } = req.body;

  // Check for existing email
  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) {
    return res.status(400).json({
      status: "fail",
      field: "email",
      message: "Email is already in use.",
    });
  }

  // Check for existing phone number
  const existingPhone = await User.findOne({ where: { phoneNumber } });
  if (existingPhone) {
    return res.status(400).json({
      status: "fail",
      field: "phoneNumber",
      message: "Phone number is already in use.",
    });
  }

  // Check for existing license number if provided
  if (licenseNumber) {
    const existingLicense = await User.findOne({ where: { licenseNumber } });
    if (existingLicense) {
      return res.status(400).json({
        status: "fail",
        field: "licenseNumber",
        message: "License number is already registered.",
      });
    }
  }

  try {
    const newUser = await User.create({
      name,
      email,
      phoneNumber,
      password,
      role,
      specialization,
      licenseType,
      licenseBody,
      licenseNumber,
      state,
      userLGA,
      address,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      const field = err.errors[0].path;
      const message = `${field.charAt(0).toUpperCase() + field.slice(1)} is already in use.`;
      return res.status(400).json({
        status: "fail",
        field,
        message,
      });
    }
    return next(err);
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Include all necessary attributes
  const user = await User.findOne({ 
    where: { email },
    attributes: ['id', 'name', 'email', 'phoneNumber', 'password', 'role', /* other needed fields */]
  });
  
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  // Verify token and check for required fields
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
  if (!decoded.id || !decoded.role) {
    return next(new AppError("Invalid token payload", 401));
  }

  const currentUser = await User.findByPk(decoded.id);
  if (!currentUser) {
    console.warn(`Rejected token for non-existent user ID: ${decoded.id}`);
    return next(new AppError('Your session is invalid. Please log in again.', 401));
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError("User recently changed password! Please log in again.", 401));
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }
    next();
  };
};