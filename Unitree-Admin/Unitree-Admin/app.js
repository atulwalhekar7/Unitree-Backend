require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const contactRoutes = require('./routes/contactRoutes');
const pdfPreviewRoutes = require('./routes/pdfPreviewRoutes');
const loanApplicationRoutes = require('./routes/loanApplicationRoutes');
const leadsRoutes = require('./routes/leadsRoutes');
const clientDealRoutes = require('./routes/clientDealRoutes');
const partnerRoutes = require('./routes/partnerRoutes');


let adminRoutes;
try {
  adminRoutes = require('./routes/adminRoutes');
  console.log('Admin routes required successfully');
} catch (error) {
  console.error('Error requiring adminRoutes:', error);
  adminRoutes = express.Router(); // fallback
}

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// Routes
console.log('Loading routes...');
app.use('/api/contact', contactRoutes);
app.use('/api/pdf-preview', pdfPreviewRoutes);
app.use('/api/loan-application', loanApplicationRoutes);
app.use('/api/leads', require('./routes/leads'));
app.use('/api', leadsRoutes);
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/deals', clientDealRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/admin', adminRoutes);
console.log('Admin routes loaded at /api/admin');

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Backend Mini Project API');
});

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}

connectDB().then(() => console.log("MONGO CONNECTED")).catch(err => console.log('MongoDB connection error:', err));
