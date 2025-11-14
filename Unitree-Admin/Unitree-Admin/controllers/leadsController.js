const Contact = require('../models/Contact');
const LoanApplication = require('../models/LoanApplication');
const PdfPreview = require('../models/PdfPreview');
const Lead = require('../models/leads');
const ClientDeal = require('../models/ClientDeal');
const PartnerApplication = require('../models/PartnerApplication');

const getAllLeads = async (req, res) => {
  try {
    // Fetch all leads from the six sources
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    const loanApplications = await LoanApplication.find().sort({ submittedAt: -1 });
    const pdfPreviews = await PdfPreview.find().sort({ submittedAt: -1 });
    const leads = await Lead.find().sort({ createdAt: -1 });
    const clientDeals = await ClientDeal.find().sort({ submittedAt: -1 });
    const partnerApplications = await PartnerApplication.find().sort({ appliedAt: -1 });

    // Combine and add type field
    const allLeads = [
      ...contacts.map(lead => ({ ...lead.toObject(), type: 'contact' })),
      ...loanApplications.map(lead => ({ ...lead.toObject(), type: 'loan-application' })),
      ...pdfPreviews.map(lead => ({ ...lead.toObject(), type: 'pdf-preview' })),
      ...leads.map(lead => ({ ...lead.toObject(), type: 'lead' })),
      ...clientDeals.map(lead => ({ ...lead.toObject(), type: 'client-deal' })),
      ...partnerApplications.map(lead => ({ ...lead.toObject(), type: 'partner-application' })),
    ];

    // Sort combined leads by submittedAt, appliedAt, or createdAt descending
    allLeads.sort((a, b) => {
      const dateA = a.submittedAt || a.appliedAt || a.createdAt;
      const dateB = b.submittedAt || b.appliedAt || b.createdAt;
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
