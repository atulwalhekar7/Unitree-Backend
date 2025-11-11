const express = require('express');
const { submitLoanApplication } = require('../controllers/Loan-Application');

const router = express.Router();

// Loan Application form submission route
router.post('/submit', submitLoanApplication);

module.exports = router;
