const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
// import { authenticate } from "../middlewares/authMiddleware";
// const {authenticate} = require("../middlewares/authMiddleware")

const router = express.Router();

router.use(authController.protect);

router.route("/me").get(userController.getMe);

// protect other routes from random users except admin
router.use(authController.restrictTo("admin"));


// console.log("✅ Route /me matched");

router.route("/").get(userController.getAllUsers);

router.route("/:id").get(userController.getUser);

module.exports = router;
