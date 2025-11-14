const express = require('express');
const router = express.Router();
const { submitPartnerApplication } = require('../controllers/partnerController');

// POST request to submit a new partner application
router.post('/apply', submitPartnerApplication); 

module.exports = router;