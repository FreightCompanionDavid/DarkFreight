const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');

// Route to create a new shipment
router.post('/create', shipmentController.createShipment);

// Route to get all shipments
router.get('/all', shipmentController.getAllShipments);

// Route to get a shipment by ID
router.get('/:id', shipmentController.getShipmentById);

// Route to update a shipment by ID
router.put('/:id', shipmentController.updateShipmentById);

// Route to delete a shipment by ID
router.delete('/:id', shipmentController.deleteShipmentById);

module.exports = router;
