const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    enum: ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Cold Call'],
    required: true,
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
    default: 'New',
  },
  leadScore: {
    type: Number,
    default: 0,
  },
  assignedRep: {
    type: String,
    default: '',
  },
  estimatedValue: {
    type: Number,
    default: 0,
  },
  lastContact: {
    type: Date,
  },
  visitedPages: [{
    type: String,
  }],
  remarks: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Lead', leadSchema);
