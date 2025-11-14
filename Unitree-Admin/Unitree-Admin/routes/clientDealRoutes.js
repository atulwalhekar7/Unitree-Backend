const express = require('express');
const router = express.Router();
const { submitClientDeal } = require('../controllers/clientDealController');

// POST request to submit a new deal
// The full path will be defined in app.js/server.js (e.g., /api/deals/submit)
router.post('/submit', submitClientDeal); 

module.exports = router;