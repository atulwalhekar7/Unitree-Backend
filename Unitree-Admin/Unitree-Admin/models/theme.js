const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  color: {
    type: String,
    enum: ['blue', 'green', 'orange', 'red', 'teal', 'pink'],
    default: 'blue',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Theme', themeSchema);
