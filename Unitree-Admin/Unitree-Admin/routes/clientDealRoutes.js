const express = require('express');
const router = express.Router();
const { submitClientDeal, getAllClientDeals } = require('../controllers/clientDealController');

// POST request to submit a new deal
// The full path will be defined in app.js/server.js (e.g., /api/deals/submit)
router.post('/submit', submitClientDeal);

// GET request to fetch all client deals
router.get('/', getAllClientDeals);

module.exports = router;
