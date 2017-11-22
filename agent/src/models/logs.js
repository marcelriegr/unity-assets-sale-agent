const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    timestamps: {
      type: Date,
      default: Date.now
    }
  },
  {
    strict: false
  }
);

module.exports = mongoose.model('Logs', schema);
