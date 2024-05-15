const Shipment = require('../models/shipment');
const ocrService = require('../services/ocrService');
const blockchainService = require('../services/blockchainService');

// Create a new shipment
exports.createShipment = async (req, res) => {
    try {
        const shipment = new Shipment(req.body);
        await shipment.save();

        // Add shipment to blockchain
        await blockchainService.addShipmentToBlockchain(shipment);

        res.status(201).json(shipment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all shipments
exports.getAllShipments = async (req, res) => {
    try {
        const shipments = await Shipment.find();
        res.status(200).json(shipments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single shipment by ID
exports.getShipmentById = async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) {
            return res.status(404).json({ error: 'Shipment not found' });
        }
        res.status(200).json(shipment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a shipment by ID
exports.updateShipmentById = async (req, res) => {
    try {
        const shipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!shipment) {
            return res.status(404).json({ error: 'Shipment not found' });
        }
        res.status(200).json(shipment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a shipment by ID
exports.deleteShipmentById = async (req, res) => {
    try {
        const shipment = await Shipment.findByIdAndDelete(req.params.id);
        if (!shipment) {
            return res.status(404).json({ error: 'Shipment not found' });
        }
        res.status(200).json({ message: 'Shipment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Verify shipment details using OCR
exports.verifyShipmentDetails = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        const ocrResult = await ocrService.processImage(imageUrl);
        res.status(200).json(ocrResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
