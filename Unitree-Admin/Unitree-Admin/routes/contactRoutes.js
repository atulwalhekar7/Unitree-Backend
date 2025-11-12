const express = require('express');
const { submitContactForm, getContacts } = require('../controllers/contactController');

const router = express.Router();

// Contact form submission route
router.post('/submit', submitContactForm);

// Get all contacts route
router.get('/contacts', getContacts);

module.exports = router;
