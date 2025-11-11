const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
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
  business_abn: {
    type: String,
    default: null,
  },
  trading_name: {
    type: String,
    default: null,
  },
  credit_rating: {
    type: String,
    required: true,
  },
  loan_type: {
    type: String,
    required: true,
  },
  business_trading_time: {
    type: String,
    required: true,
  },
  loan_amount: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contact', contactSchema);
