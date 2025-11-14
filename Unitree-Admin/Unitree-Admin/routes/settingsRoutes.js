const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');

// GET /api/settings - Get user settings
router.get('/', getSettings);

// PUT /api/settings - Update user settings
router.put('/', updateSettings);

module.exports = router;
