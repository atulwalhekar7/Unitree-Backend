const express = require('express');
const { submitPdfPreviewForm, getAllPdfPreviews } = require('../controllers/PdfPreview');

const router = express.Router();

// PDF Preview form submission route
router.post('/submit', submitPdfPreviewForm);

// GET route to retrieve all PDF preview requests
router.get('/', getAllPdfPreviews);

module.exports = router;
