const mongoose = require('mongoose');

const pdfPreviewSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'contacted'],
    default: 'new',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PdfPreview', pdfPreviewSchema);
