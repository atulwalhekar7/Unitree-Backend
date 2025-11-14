const mongoose = require('mongoose');

const ClientDealSchema = new mongoose.Schema({
    // --- Your Details ---
    firstName: {
        type: String,
        required: [true, 'Your first name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Your last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Your email is required'],
        trim: true,
        lowercase: true,
        // Assuming you want a record of every user who submits a deal, 
        // but not necessarily unique on this field since multiple deals might be submitted by the same partner.
    },
    contactNo: {
        type: String,
        required: [true, 'Your contact number is required'],
        trim: true
    },

    // --- Scenario Details ---
    loanAmount: {
        type: Number,
        required: [true, 'Loan amount is required'],
        min: [0, 'Loan amount must be non-negative']
    },
    clientRevenue: {
        type: Number,
        required: [true, 'Client monthly revenue is required'],
        min: [0, 'Client monthly revenue must be non-negative']
    },
    clientTimeInBusiness: {
        type: String,
        required: [true, "Client's time in business is required"],
        enum: ['0-1-years', '1-3-years', '3-5-years', '5-10-years', '10+-years', 'Other'] // Based on your Select options, added 'Other' fallback
    },
    clientIndustry: {
        type: String,
        required: [true, "Client's industry is required"],
        trim: true
    },

    // --- Client Details ---
    clientFirstName: {
        type: String,
        required: [true, "Client's first name is required"],
        trim: true
    },
    clientLastName: {
        type: String,
        required: [true, "Client's last name is required"],
        trim: true
    },
    clientEmail: {
        type: String,
        required: [true, "Client's email is required"],
        trim: true,
        lowercase: true
    },
    clientContactNo: {
        type: String,
        trim: true, // Not required in the frontend validation, so making it optional here
        default: ''
    },
    
    // --- Metadata ---
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

const ClientDeal = mongoose.model('ClientDeal', ClientDealSchema);

module.exports = ClientDeal;