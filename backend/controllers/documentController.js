const Document = require('../models/document');
const ocrService = require('../services/ocrService');
const blockchainService = require('../services/blockchainService');

// Controller to handle document scanning
exports.scanDocument = async (req, res) => {
    try {
        const { file } = req;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Use OCR service to process the document
        const ocrResult = await ocrService.processDocument(file.path);

        // Save the document details in the database
        const newDocument = new Document({
            filePath: file.path,
            ocrData: ocrResult,
            status: 'scanned'
        });
        await newDocument.save();

        // Optionally, add the document transaction to the blockchain
        await blockchainService.addDocumentTransaction(newDocument);

        res.status(200).json({ message: 'Document scanned successfully', document: newDocument });
    } catch (error) {
        console.error('Error scanning document:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to handle document verification
exports.verifyDocument = async (req, res) => {
    try {
        const { documentId, verificationData } = req.body;
        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Perform verification logic (e.g., comparing OCR data with provided verification data)
        const isVerified = ocrService.verifyDocument(document.ocrData, verificationData);

        if (isVerified) {
            document.status = 'verified';
            await document.save();
            res.status(200).json({ message: 'Document verified successfully', document });
        } else {
            res.status(400).json({ message: 'Document verification failed' });
        }
    } catch (error) {
        console.error('Error verifying document:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get real-time updates on document processing
exports.getDocumentStatus = async (req, res) => {
    try {
        const { documentId } = req.params;
        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.status(200).json({ document });
    } catch (error) {
        console.error('Error fetching document status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
