const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    strict: false
  }
);

module.exports = mongoose.model('AssetSale', schema);
