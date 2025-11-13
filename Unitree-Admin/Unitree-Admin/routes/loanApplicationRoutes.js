const express = require('express');
const { submitLoanApplication, getLoanApplications } = require('../controllers/Loan-Application');

const router = express.Router();

// Loan Application form submission route
router.post('/submit', submitLoanApplication);

// Get all loan applications route
router.get('/loan-applications', getLoanApplications);

module.exports = router;
