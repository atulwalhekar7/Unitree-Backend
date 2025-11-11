const express = require('express');
const { submitPdfPreviewForm } = require('../controllers/PdfPreview');

const router = express.Router();

// PDF Preview form submission route
router.post('/submit', submitPdfPreviewForm);

module.exports = router;
