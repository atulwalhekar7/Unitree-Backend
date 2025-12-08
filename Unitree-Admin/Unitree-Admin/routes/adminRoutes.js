// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

console.log('Admin routes file loaded');

// Test route
router.get('/test', (req, res) => res.send('Admin routes working'));

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