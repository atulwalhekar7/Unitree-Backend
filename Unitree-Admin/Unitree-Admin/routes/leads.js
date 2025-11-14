const express = require('express');
const { createLead, updateLead, deleteLead } = require('../controllers/newleads');

const router = express.Router();

// Create a new lead
router.post('/', createLead);

// Update a lead
router.put('/:id', updateLead);

// Delete a lead
router.delete('/:id', deleteLead);

module.exports = router;
