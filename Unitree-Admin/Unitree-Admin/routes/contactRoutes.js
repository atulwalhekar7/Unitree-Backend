const express = require('express');
const { submitContactForm } = require('../controllers/contactController');

const router = express.Router();

// Contact form submission route
router.post('/submit', submitContactForm);

module.exports = router;
