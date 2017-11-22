const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true
    }
  },
  {
    strict: false
  }
);

module.exports = mongoose.model('Information', schema);
