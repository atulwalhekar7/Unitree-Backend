// controllers/authController.js
const sendEmail = require("../utils/sendEmail");



const Admin = require('../models/admin'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET; 

/**
 * Helper function to generate a JWT
 */
const generateToken = (id) => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    return jwt.sign({ id, role: 'admin' }, JWT_SECRET, {
        expiresIn: '1d', 
    });
};

/**
 * Utility function to generate a secure, temporary reset token
 */
const createPasswordResetToken = (admin) => {
    // 1. Generate a secure, non-hashed token (sent to the user via email)
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // 2. Hash the token and store it in the database (for security)
    admin.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // 3. Set the expiry time (10 minutes from now)
    admin.passwordResetExpires = Date.now() + 10 * 60 * 1000; 
    
    // 4. Return the UN-HASHED token to be emailed
    return resetToken; 
};


// ==========================================================
// Admin Sign Up (For creating users securely)
// ==========================================================
exports.adminSignup = async (req, res) => {
    console.log('adminSignup called with body:', req.body);
    console.log('Content-Type:', req.headers['content-type']);
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password required" });
        }

        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        
        // Hash the password securely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await Admin.create({
            username,
            email,
            password: hashedPassword,
        });

        if (admin) {
            res.status(201).json({
                _id: admin._id,
                username: admin.username,
                email: admin.email,
                message: "SUCCESS: Admin created."
            });
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }

    } catch (error) {
        console.error('Admin Sign Up Error Details:', error);
        res.status(500).json({ message: 'Server Error during sign-up' });
    }
};

// ==========================================================
// Admin Login 
// ==========================================================
exports.adminLogin = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ message: "Request body missing" });
      }
  
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }
  
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      res.json({ message: "Login successful", admin });
  
    } catch (err) {
      console.error("Admin Login Error Details:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// ==========================================================
// Forgot Password 
// ==========================================================
exports.forgotPassword = async (req, res) => {
    try {
      console.log("✅ REQUEST BODY:", req.body);
  
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      console.log("✅ ADMIN EMAIL FOUND:", admin.email);
  
      // Generate reset token
      const resetToken = createPasswordResetToken(admin);
      await admin.save({ validateBeforeSave: false });
  
      const resetURL = `http://localhost:5000/api/admin/resetpassword/${resetToken}`;

  
      const message = `
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetURL}">Reset Password</a>
        <p>Valid for 10 minutes.</p>
      `;
  
      const emailResult = await sendEmail({
        email: admin.email,  // ✅ THIS MUST BE FILLED
        subject: "Password Reset",
        message,
      });
  
      if (!emailResult.success) {
        return res.status(500).json({
          message: "Could not send email. Try again later.",
        });
      }
  
      res.status(200).json({
        message: "Password reset email sent successfully!",
      });
  
    } catch (err) {
      console.error("❌ Forgot Password Error:", err);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  

  


// ==========================================================
// Reset Password 
// ==========================================================

exports.showResetForm = async (req, res) => {
    res.send(`
      <html>
        <head>
          <title>Reset Password</title>
        </head>
        <body style="font-family: Arial; padding: 40px;">
          <h2>Reset Your Password</h2>
          <form method="POST">
            <input 
              type="password" 
              name="password" 
              placeholder="Enter new password" 
              required 
              style="padding:10px; width:250px;"
            />
            <br/><br/>
            <button type="submit" style="padding:10px 20px;">
              Reset Password
            </button>
          </form>
        </body>
      </html>
    `);
  };


exports.resetPassword = async (req, res) => {
    try {
      const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
  
      const admin = await Admin.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });
  
      if (!admin) {
        return res.send("<h3>Token is invalid or has expired</h3>");
      }
  
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(req.body.password, salt);
  
      admin.passwordResetToken = undefined;
      admin.passwordResetExpires = undefined;
  
      await admin.save();
  
      res.send("<h2>Password Reset Successful ✅</h2><p>You can now login.</p>");
    } catch (err) {
      res.send("<h2>Something went wrong ❌</h2>");
    }
  };
  

console.log("EMAIL ENV:", process.env.EMAIL_SERVICE_USER, process.env.EMAIL_SERVICE_PASS);


  
