// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 1. Create Demo Admin
router.post('/signup', authController.adminSignup); 

// 2. Login
router.post('/login', authController.adminLogin);

// 3. Forgot Password
router.post('/forgotpassword', authController.forgotPassword);

// 4. Reset Password
// Show reset password form
router.get('/resetpassword/:token', authController.showResetForm);

// Handle new password submit
router.post('/resetpassword/:token', authController.resetPassword);


module.exports = router;