const express = require('express');
const { getAllLeads } = require('../controllers/leadsController');

const router = express.Router();

// Get all leads combined
router.get('/leads', getAllLeads);

module.exports = router;
