const sgMail = require('@sendgrid/mail');
const PdfPreview = require('../models/PdfPreview');
// dotenv already loaded in app.js

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// PDF Preview form submission handler
const submitPdfPreviewForm = async (req, res) => {
  try {
    const {
      fullName,
      contactNumber,
      email,
      message,
      hidden_field, // Honeypot field
    } = req.body;

    // Check honeypot field for spam
    if (hidden_field) {
      return res.status(400).json({ message: 'Spam detected' });
    }

    // Validate required fields
    if (!fullName || !contactNumber || !email || !message) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate phone number (basic check for digits and length)
    const phoneRegex = /^\+?\d{8,15}$/;
    if (!phoneRegex.test(contactNumber)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }

    // Email content
    const msg = {
      to: process.env.RECIPIENT_EMAIL,
      from: {
        email: process.env.RECIPIENT_EMAIL, // Use verified email as from
        name: fullName, // From the submitter's name
      },
      reply_to: {
        email: email, // Reply to the submitter's email
        name: fullName,
      },
      subject: `New PDF Preview Request from ${fullName}`,
      html: `
        <h2>New PDF Preview Request</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Contact Number:</strong> ${contactNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send email to admin
    await sgMail.send(msg);

    // Send confirmation email to submitter
    const confirmationMsg = {
      to: email, // Submitter's email
      from: {
        email: process.env.RECIPIENT_EMAIL, // Use verified email as from
        name: 'Unitree Admin', // Or your app name
      },
      subject: 'Thank you for your PDF preview request',
      html: `
        <h2>Thank you for your request!</h2>
        <p>Dear ${fullName},</p>
        <p>We have received your PDF preview request and will get back to you soon.</p>
        <p><strong>Your Details:</strong></p>
        <ul>
          <li>Full Name: ${fullName}</li>
          <li>Contact Number: ${contactNumber}</li>
          <li>Email: ${email}</li>
        </ul>
        <p>Best regards,<br>Unitree Admin Team</p>
      `,
    };

    // Send confirmation email
    await sgMail.send(confirmationMsg);

    // Save to database
    const newPdfPreview = new PdfPreview({
      fullName,
      contactNumber,
      email,
      message,
    });
    await newPdfPreview.save();

    res.status(200).json({ message: 'Request sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    console.error('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'Set' : 'Not set');
    console.error('RECIPIENT_EMAIL:', process.env.RECIPIENT_EMAIL);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllPdfPreviews = async (req, res) => {
  try {
    const pdfPreviews = await PdfPreview.find().sort({ submittedAt: -1 });
    res.status(200).json(pdfPreviews);
  } catch (error) {
    console.error('Error fetching PDF previews:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  submitPdfPreviewForm,
  getAllPdfPreviews,
};
