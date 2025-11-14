const mongoose = require('mongoose');

const PartnerApplicationSchema = new mongoose.Schema({
    // --- Personal Details ---
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true // Email should likely be unique for a Partner application
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required'],
        trim: true
    },
    profession: {
        type: String,
        required: [true, 'Profession is required'],
        trim: true
    },

    // --- Business Details ---
    businessName: {
        type: String,
        required: [true, 'Business name is required'],
        trim: true
    },
    businessDescription: {
        type: String,
        trim: true
    },
    businessAbn: {
        type: String, // ABNs are usually stored as strings
        required: [true, 'ABN is required'],
        trim: true
    },

    // --- Address Details ---
    streetAddress: {
        type: String,
        required: [true, 'Street address is required'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true
    },
    postCode: {
        type: String, // Postcodes can sometimes have letters or leading zeros
        required: [true, 'Postcode is required'],
        trim: true
    },

    // --- Metadata ---
    status: {
        type: String,
        enum: ['new', 'contacted'],
        default: 'new',
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

const PartnerApplication = mongoose.model('PartnerApplication', PartnerApplicationSchema);

module.exports = PartnerApplication;