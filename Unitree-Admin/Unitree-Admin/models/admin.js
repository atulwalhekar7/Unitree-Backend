// models/admin.js

const mongoose = require('mongoose');
// const bcrypt = require('bcrypt'); // No longer needed here as hashing happens in the controller

const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        // --- NEW FIELDS FOR PASSWORD RESET ---
        passwordResetToken: String,      // Stores the HASHED token
        passwordResetExpires: Date,      // Stores the token expiry time
    },
    { timestamps: true }
);

// We REMOVED the adminSchema.pre('save') hook here to prevent double-hashing.

module.exports = mongoose.model('Admin', adminSchema);