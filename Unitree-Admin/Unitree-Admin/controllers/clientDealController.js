const ClientDeal = require('../models/ClientDeal');

/**
 * @desc    Create a new client deal submission
 * @route   POST /api/deals/submit
 * @access  Public (or protected if you add auth later)
 */
exports.submitClientDeal = async (req, res) => {
    try {
        // 1. Get data from the request body (which comes from your frontend form)
        const dealData = req.body;

        // 2. Create a new document using the Mongoose Model
        const newDeal = await ClientDeal.create(dealData);

        // Optional: Log the submission (for debugging/monitoring)
        console.log('New Client Deal Submitted:', newDeal._id);

        // 3. Send a successful response back to the client (Frontend)
        res.status(201).json({
            success: true,
            message: 'Client deal successfully submitted and saved to database.',
            data: newDeal // You can return the saved object if needed
        });

    } catch (error) {
        // Handle validation errors from Mongoose or other server errors
        console.error('Error submitting client deal:', error);

        // Check for Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                details: messages
            });
        }

        // Handle other server errors
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: 'Could not save the client deal.'
        });
    }
};

/**
 * @desc    Get all client deals
 * @route   GET /api/deals
 * @access  Public (or protected if you add auth later)
 */
exports.getAllClientDeals = async (req, res) => {
    try {
        const deals = await ClientDeal.find({}).sort({ submittedAt: -1 });

        res.status(200).json({
            success: true,
            count: deals.length,
            data: deals
        });

    } catch (error) {
        console.error('Error fetching client deals:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: 'Could not fetch client deals.'
        });
    }
};
