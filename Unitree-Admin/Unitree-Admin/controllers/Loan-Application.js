const sgMail = require('@sendgrid/mail');
const LoanApplication = require('../models/LoanApplication');
// dotenv already loaded in app.js

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Loan Application form submission handler
const submitLoanApplication = async (req, res) => {
  try {
    const {
      loan_type,
      loan_amount,
      loan_purpose,
      loan_term,
      full_name,
      middle_name,
      contact_number,
      email,
      date_of_birth,
      marital_status,
      dependents,
      driver_license,
      medicare_number,
      passport_number,
      residential_address,
      residential_status,
      time_at_address,
      previous_address,
      employment_type,
      employer_name,
      occupation,
      time_with_employer,
      income_range,
      monthly_income,
      other_income,
      monthly_expenses,
      existing_debts,
      credit_profile,
      assets,
      bank_name,
      account_years,
      credit_cards,
      total_credit_limit,
      have_mortgage,
      mortgage_balance,
      bankruptcy_history,
      property_value,
      vehicle_make,
      vehicle_model,
      vehicle_year,
      vehicle_price,
      business_name,
      business_abn,
      business_years,
      preferred_contact_method,
      preferred_contact_time,
      referral_source,
      notes,
      hidden_field, // Honeypot field
    } = req.body;

    // Check honeypot field for spam
    if (hidden_field) {
      return res.status(400).json({ message: 'Spam detected' });
    }

    // Validate required fields
    if (!loan_type || !loan_amount || !loan_purpose || !loan_term || !full_name || !contact_number || !email || !date_of_birth || !residential_address || !residential_status || !time_at_address || !employment_type || !employer_name || !occupation || !monthly_income || !credit_profile || !bank_name) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate loan amount
    if (loan_amount <= 0) {
      return res.status(400).json({ message: 'Loan amount must be greater than zero' });
    }

    // Validate loan term
    if (loan_term <= 0) {
      return res.status(400).json({ message: 'Loan term must be greater than zero' });
    }

    // Validate date of birth (must be in the past)
    const dob = new Date(date_of_birth);
    if (isNaN(dob.getTime()) || dob >= new Date()) {
      return res.status(400).json({ message: 'Invalid date of birth' });
    }

    // Validate monthly income
    if (monthly_income < 0) {
      return res.status(400).json({ message: 'Monthly income cannot be negative' });
    }

    // Save to database
    const loanApplication = new LoanApplication({
      loan_type,
      loan_amount,
      loan_purpose,
      loan_term,
      full_name,
      middle_name,
      contact_number,
      email,
      date_of_birth,
      marital_status,
      dependents,
      driver_license,
      medicare_number,
      passport_number,
      residential_address,
      residential_status,
      time_at_address,
      previous_address,
      employment_type,
      employer_name,
      occupation,
      time_with_employer,
      income_range,
      monthly_income,
      other_income,
      monthly_expenses,
      existing_debts,
      credit_profile,
      assets,
      bank_name,
      account_years,
      credit_cards,
      total_credit_limit,
      have_mortgage,
      mortgage_balance,
      bankruptcy_history,
      property_value,
      vehicle_make,
      vehicle_model,
      vehicle_year,
      vehicle_price,
      business_name,
      business_abn,
      business_years,
      preferred_contact_method,
      preferred_contact_time,
      referral_source,
      notes,
    });

    await loanApplication.save();

    // Email content
    const msg = {
      to: process.env.RECIPIENT_EMAIL,
      from: {
        email: process.env.RECIPIENT_EMAIL, // Use verified email as from
        name: full_name, // From the applicant's name
      },
      reply_to: {
        email: email, // Reply to the applicant's email
        name: full_name,
      },
      subject: `New Loan Application from ${full_name}`,
      html: `
        <h2>New Loan Application Submission</h2>
        <h3>Loan Details</h3>
        <p><strong>Loan Type:</strong> ${loan_type}</p>
        <p><strong>Loan Amount:</strong> $${loan_amount}</p>
        <p><strong>Loan Purpose:</strong> ${loan_purpose}</p>
        <p><strong>Loan Term:</strong> ${loan_term} months</p>

        <h3>Personal Information</h3>
        <p><strong>Full Name:</strong> ${full_name}</p>
        <p><strong>Middle Name:</strong> ${middle_name || 'N/A'}</p>
        <p><strong>Contact Number:</strong> ${contact_number}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date of Birth:</strong> ${date_of_birth}</p>
        <p><strong>Marital Status:</strong> ${marital_status || 'N/A'}</p>
        <p><strong>Dependents:</strong> ${dependents || 0}</p>
        <p><strong>Driver License:</strong> ${driver_license || 'N/A'}</p>
        <p><strong>Medicare Number:</strong> ${medicare_number || 'N/A'}</p>
        <p><strong>Passport Number:</strong> ${passport_number || 'N/A'}</p>

        <h3>Residential Information</h3>
        <p><strong>Residential Address:</strong> ${residential_address}</p>
        <p><strong>Residential Status:</strong> ${residential_status}</p>
        <p><strong>Time at Address:</strong> ${time_at_address}</p>
        <p><strong>Previous Address:</strong> ${previous_address || 'N/A'}</p>

        <h3>Employment & Income</h3>
        <p><strong>Employment Type:</strong> ${employment_type}</p>
        <p><strong>Employer Name:</strong> ${employer_name}</p>
        <p><strong>Occupation:</strong> ${occupation}</p>
        <p><strong>Time with Employer:</strong> ${time_with_employer || 'N/A'}</p>
        <p><strong>Income Range:</strong> ${income_range || 'N/A'}</p>
        <p><strong>Monthly Income:</strong> $${monthly_income}</p>
        <p><strong>Other Income:</strong> $${other_income || 0}</p>
        <p><strong>Monthly Expenses:</strong> $${monthly_expenses || 0}</p>

        <h3>Financial Profile</h3>
        <p><strong>Existing Debts:</strong> ${existing_debts || 'N/A'}</p>
        <p><strong>Credit Profile:</strong> ${credit_profile}</p>
        <p><strong>Assets:</strong> ${assets || 'N/A'}</p>
        <p><strong>Bank Name:</strong> ${bank_name}</p>
        <p><strong>Account Years:</strong> ${account_years || 0}</p>
        <p><strong>Credit Cards:</strong> ${credit_cards || 0}</p>
        <p><strong>Total Credit Limit:</strong> $${total_credit_limit || 0}</p>
        <p><strong>Have Mortgage:</strong> ${have_mortgage ? 'Yes' : 'No'}</p>
        <p><strong>Mortgage Balance:</strong> $${mortgage_balance || 0}</p>
        <p><strong>Bankruptcy History:</strong> ${bankruptcy_history ? 'Yes' : 'No'}</p>

        <h3>Loan-Specific Details</h3>
        ${loan_type === 'home' ? `<p><strong>Property Value:</strong> $${property_value}</p>` : ''}
        ${loan_type === 'car' ? `<p><strong>Vehicle Make:</strong> ${vehicle_make}</p><p><strong>Vehicle Model:</strong> ${vehicle_model}</p><p><strong>Vehicle Year:</strong> ${vehicle_year}</p><p><strong>Vehicle Price:</strong> $${vehicle_price}</p>` : ''}
        ${loan_type === 'business' ? `<p><strong>Business Name:</strong> ${business_name}</p><p><strong>Business ABN:</strong> ${business_abn}</p><p><strong>Business Years:</strong> ${business_years}</p>` : ''}

        <h3>Contact Preferences</h3>
        <p><strong>Preferred Contact Method:</strong> ${preferred_contact_method}</p>
        <p><strong>Preferred Contact Time:</strong> ${preferred_contact_time || 'N/A'}</p>
        <p><strong>Referral Source:</strong> ${referral_source || 'N/A'}</p>
        <p><strong>Notes:</strong> ${notes || 'N/A'}</p>
      `,
    };

    // Send email to admin
    await sgMail.send(msg);

    // Send confirmation email to applicant
    const confirmationMsg = {
      to: email, // Applicant's email
      from: {
        email: process.env.RECIPIENT_EMAIL, // Use verified email as from
        name: 'Unitree Admin', // Or your app name
      },
      subject: 'Thank you for your loan application',
      html: `
        <h2>Thank you for your loan application!</h2>
        <p>Dear ${full_name},</p>
        <p>We have received your loan application and will review it shortly.</p>
        <p><strong>Your Application Summary:</strong></p>
        <ul>
          <li>Loan Type: ${loan_type}</li>
          <li>Loan Amount: $${loan_amount}</li>
          <li>Loan Term: ${loan_term} months</li>
          <li>Full Name: ${full_name}</li>
          <li>Email: ${email}</li>
          <li>Contact Number: ${contact_number}</li>
        </ul>
        <p>Best regards,<br>Unitree Admin Team</p>
      `,
    };

    // Send confirmation email
    await sgMail.send(confirmationMsg);

    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    console.error('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'Set' : 'Not set');
    console.error('RECIPIENT_EMAIL:', process.env.RECIPIENT_EMAIL);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getLoanApplications = async (req, res) => {
  try {
    const loanApplications = await LoanApplication.find().sort({ submittedAt: -1 }); // Sort by newest first
    res.status(200).json({ loanApplications });
  } catch (error) {
    console.error('Error fetching loan applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  submitLoanApplication,
  getLoanApplications,
};
