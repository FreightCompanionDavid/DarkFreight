const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  scannedAt: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  shipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shipment',
    required: true,
  },
  ocrData: {
    type: Map,
    of: String,
  },
  blockchainHash: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
