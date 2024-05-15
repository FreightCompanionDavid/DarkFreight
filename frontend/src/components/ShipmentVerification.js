import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import useAPI from '../hooks/useAPI';
import { verifyShipment } from '../store/actions';

const ShipmentVerification = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const dispatch = useDispatch();
  const api = useAPI();
  const shipmentDetails = useSelector(state => state.shipmentDetails);

  useEffect(() => {
    if (shipmentId) {
      dispatch(verifyShipment(shipmentId));
    }
  }, [shipmentId, dispatch]);

  const handleVoiceCommand = (command) => {
    // Assuming command is a string like "Verify shipment 12345"
    const id = command.split(' ').pop();
    setShipmentId(id);
  };

  const handleVerification = async () => {
    try {
      const result = await api.verifyShipment(shipmentId);
      setVerificationResult(result);
    } catch (error) {
      console.error('Verification failed', error);
      setVerificationResult({ success: false, message: 'Verification failed' });
    }
  };

  return (
    <div className="shipment-verification">
      <h1>Shipment Verification</h1>
      <div>
        <label htmlFor="shipmentId">Shipment ID:</label>
        <input
          type="text"
          id="shipmentId"
          value={shipmentId}
          onChange={(e) => setShipmentId(e.target.value)}
        />
        <button onClick={handleVerification}>Verify</button>
      </div>
      {verificationResult && (
        <div className={`verification-result ${verificationResult.success ? 'success' : 'failure'}`}>
          {verificationResult.message}
        </div>
      )}
      {shipmentDetails && (
        <div className="shipment-details">
          <h2></h2>
          <p>ID: {shipmentDetails.id}</p>
          <p>Status: {shipmentDetails.status}</p>
          <p>: {shipmentDetails.origin}</p>
          <p>shipmentDetails.destination}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default ShipmentVerification;
Destination: {Origin</h2>Shipment Details</h1>