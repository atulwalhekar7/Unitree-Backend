const express = require('express');
const router = express.Router();
const { submitPartnerApplication, getAllPartnerApplications } = require('../controllers/partnerController');

// POST request to submit a new partner application
router.post('/apply', submitPartnerApplication);

// GET request to fetch all partner applications
router.get('/', getAllPartnerApplications);

module.exports = router;
