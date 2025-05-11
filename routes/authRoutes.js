const express = require('express');
const authController = require('../controller/authController');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protect all routes after this middleware
router.use(authController.protect);

// router.get('/me',userController.getMe);
// console.log("✅ Route /me matched");
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

module.exports = router;