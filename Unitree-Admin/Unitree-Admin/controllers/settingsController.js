const Theme = require('../models/theme');
const Settings = require('../models/settings');

// Get user settings
const getSettings = async (req, res) => {
  try {
    // Fetch theme and settings (assuming single document for demo)
    const theme = await Theme.findOne().select('color');
    const settings = await Settings.findOne().select('data');

    // Available theme options
    const themeOptions = [
      { name: 'Blue', color: 'blue', description: 'Professional and trustworthy' },
      { name: 'Green', color: 'green', description: 'Fresh and natural' },
      { name: 'Orange', color: 'orange', description: 'Energetic and vibrant' },
      { name: 'Red', color: 'red', description: 'Bold and passionate' },
      { name: 'Teal', color: 'teal', description: 'Modern and balanced' },
      { name: 'Pink', color: 'pink', description: 'Creative and friendly' },
    ];

    res.json({
      themeColor: theme ? theme.color : 'blue',
      settings: settings ? settings.data : {},
      themeOptions,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user settings
const updateSettings = async (req, res) => {
  try {
    const { themeColor, settings } = req.body;

    // Validate themeColor if provided
    const validThemes = ['blue', 'green', 'orange', 'red', 'teal', 'pink'];
    if (themeColor && !validThemes.includes(themeColor)) {
      return res.status(400).json({ message: 'Invalid theme color' });
    }

    let updatedTheme = null;
    let updatedSettings = null;

    // Update theme if provided
    if (themeColor !== undefined) {
      updatedTheme = await Theme.findOneAndUpdate(
        {},
        { color: themeColor },
        { new: true, upsert: true, runValidators: true }
      );
    }

    // Update settings if provided
    if (settings !== undefined) {
      updatedSettings = await Settings.findOneAndUpdate(
        {},
        { data: settings },
        { new: true, upsert: true, runValidators: true }
      );
    }

    // If neither was provided, return current values
    if (updatedTheme === null && updatedSettings === null) {
      const theme = await Theme.findOne().select('color');
      const settingsDoc = await Settings.findOne().select('data');
      updatedTheme = theme;
      updatedSettings = settingsDoc;
    }

    res.json({
      message: 'Settings updated successfully',
      themeColor: updatedTheme ? updatedTheme.color : 'blue',
      settings: updatedSettings ? updatedSettings.data : {},
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
