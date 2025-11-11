const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
  loan_type: {
    type: String,
    required: true,
  },
  loan_amount: {
    type: Number,
    required: true,
  },
  loan_purpose: {
    type: String,
    required: true,
  },
  loan_term: {
    type: Number,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    default: null,
  },
  contact_number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  marital_status: {
    type: String,
    default: null,
  },
  dependents: {
    type: Number,
    default: 0,
  },
  driver_license: {
    type: String,
    default: null,
  },
  medicare_number: {
    type: String,
    default: null,
  },
  passport_number: {
    type: String,
    default: null,
  },
  residential_address: {
    type: String,
    required: true,
  },
  residential_status: {
    type: String,
    required: true,
  },
  time_at_address: {
    type: String,
    required: true,
  },
  previous_address: {
    type: String,
    default: null,
  },
  employment_type: {
    type: String,
    required: true,
  },
  employer_name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  time_with_employer: {
    type: String,
    default: null,
  },
  income_range: {
    type: String,
    default: null,
  },
  monthly_income: {
    type: Number,
    required: true,
  },
  other_income: {
    type: Number,
    default: 0,
  },
  monthly_expenses: {
    type: Number,
    default: 0,
  },
  existing_debts: {
    type: String,
    default: null,
  },
  credit_profile: {
    type: String,
    required: true,
  },
  assets: {
    type: String,
    default: null,
  },
  bank_name: {
    type: String,
    required: true,
  },
  account_years: {
    type: Number,
    default: 0,
  },
  credit_cards: {
    type: Number,
    default: 0,
  },
  total_credit_limit: {
    type: Number,
    default: 0,
  },
  have_mortgage: {
    type: Boolean,
    default: false,
  },
  mortgage_balance: {
    type: Number,
    default: 0,
  },
  bankruptcy_history: {
    type: Boolean,
    default: false,
  },
  property_value: {
    type: Number,
    default: null,
  },
  vehicle_make: {
    type: String,
    default: null,
  },
  vehicle_model: {
    type: String,
    default: null,
  },
  vehicle_year: {
    type: Number,
    default: null,
  },
  vehicle_price: {
    type: Number,
    default: null,
  },
  business_name: {
    type: String,
    default: null,
  },
  business_abn: {
    type: String,
    default: null,
  },
  business_years: {
    type: Number,
    default: null,
  },
  preferred_contact_method: {
    type: String,
    default: null,
  },
  preferred_contact_time: {
    type: String,
    default: null,
  },
  referral_source: {
    type: String,
    default: null,
  },
  notes: {
    type: String,
    default: null,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LoanApplication', loanApplicationSchema);
