require('dotenv').config({ path: './.env' });

// Temporary console logs to confirm environment variables are loaded
console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "Yes" : "No");
console.log("EMAIL_FROM loaded:", process.env.EMAIL_FROM ? "Yes" : "No");


const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');

// Routes
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
  adminRoutes = express.Router();
}

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes mapping
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

// Test route
app.get('/', (req, res) => {
  res.send('Backend Mini Project API');
});

// PORT
const PORT = process.env.PORT || 5000;

// CONNECT MONGODB FIRST → THEN START SERVER
connectDB()
  .then(() => {
    console.log("Mongo connected, starting server...");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });
