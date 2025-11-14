const PartnerApplication = require('../models/PartnerApplication');

/**
 * @desc    Create a new partner application submission
 * @route   POST /api/partners/apply
 * @access  Public
 */
exports.submitPartnerApplication = async (req, res) => {
    try {
        const applicationData = req.body;

        // Create a new document in MongoDB
        const newApplication = await PartnerApplication.create(applicationData);

        console.log('New Partner Application Submitted:', newApplication._id);
        
        // Success response
        res.status(201).json({
            success: true,
            message: 'Partner application successfully submitted.',
            data: newApplication
        });

    } catch (error) {
        console.error('Error submitting partner application:', error);

        // Mongoose validation error handling
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ 
                success: false, 
                error: 'Validation Error', 
                details: messages 
            });
        }
        
        // Handle MongoDB duplicate key error (e.g., if email unique check fails)
        if (error.code === 11000) {
            return res.status(400).json({ 
                success: false, 
                error: 'Duplicate Field', 
                message: 'This email address is already registered as a partner application.'
            });
        }
        
        // Generic server error
        res.status(500).json({ 
            success: false, 
            error: 'Server Error', 
            message: 'Could not process the partner application.' 
        });
    }
};