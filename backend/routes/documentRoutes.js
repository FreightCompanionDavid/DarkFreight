const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// Route to scan and digitize documents using OCR
router.post('/scan', documentController.scanDocument);

// Route to verify shipment details and documentation using voice prompts
router.post('/verify', documentController.verifyDocument);

// Route to get real-time updates on document processing
router.get('/updates', documentController.getDocumentUpdates);

module.exports = router;
