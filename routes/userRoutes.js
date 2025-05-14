const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authController = require("../controller/authController");

// Apply protection to all routes
router.use(authController.protect);

// Me route - protected but not admin-restricted
router.get("/me", userController.getMe);

// Admin-only routes
router.use(authController.restrictTo("admin"));
router.get("/", userController.getAllUsers);
router.get("/userId", userController.getUser);

module.exports = router;