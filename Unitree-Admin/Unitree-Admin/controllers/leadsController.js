const Contact = require('../models/Contact');
const LoanApplication = require('../models/LoanApplication');
const PdfPreview = require('../models/PdfPreview');
const Lead = require('../models/leads');

const getAllLeads = async (req, res) => {
  try {
    // Fetch all leads from the four sources
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    const loanApplications = await LoanApplication.find().sort({ submittedAt: -1 });
    const pdfPreviews = await PdfPreview.find().sort({ submittedAt: -1 });
    const leads = await Lead.find().sort({ createdAt: -1 });

    // Combine and add type field
    const allLeads = [
      ...contacts.map(lead => ({ ...lead.toObject(), type: 'contact' })),
      ...loanApplications.map(lead => ({ ...lead.toObject(), type: 'loan-application' })),
      ...pdfPreviews.map(lead => ({ ...lead.toObject(), type: 'pdf-preview' })),
      ...leads.map(lead => ({ ...lead.toObject(), type: 'lead' })),
    ];

    // Sort combined leads by submittedAt or createdAt descending
    allLeads.sort((a, b) => {
      const dateA = a.submittedAt || a.createdAt;
      const dateB = b.submittedAt || b.createdAt;
      return new Date(dateB) - new Date(dateA);
    });

    // Calculate total leads
    const totalLeads = allLeads.length;

    res.status(200).json({
      totalLeads,
      leads: allLeads,
    });
  } catch (error) {
    console.error('Error fetching all leads:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllLeads,
};
