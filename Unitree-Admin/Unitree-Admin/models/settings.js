const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Settings', settingsSchema);
