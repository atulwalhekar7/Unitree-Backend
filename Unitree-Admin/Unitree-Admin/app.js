require('dotenv').config({ encoding: 'utf16le' });

const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const contactRoutes = require('./routes/contactRoutes');
const pdfPreviewRoutes = require('./routes/pdfPreviewRoutes');
const loanApplicationRoutes = require('./routes/loanApplicationRoutes');
const clientDealRoutes = require('./routes/clientDealRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const app = express();

// Connect to MongoDB (optional for contact form)
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/pdf-preview', pdfPreviewRoutes);
app.use('/api/loan-application', loanApplicationRoutes);
app.use('/api/deals', clientDealRoutes);
app.use('/api/partners', partnerRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Backend Mini Project API');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
