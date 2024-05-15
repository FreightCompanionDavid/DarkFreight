import './ShipmentTracker.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { fetchShipmentStatus } from '../store/actions';

const ShipmentTracker = () => {
  const dispatch = useDispatch();
  const shipmentStatus = useSelector(state => state.shipmentStatus);
  const [trackingNumber, setTrackingNumber] = useState('');

  useEffect(() => {
    if (trackingNumber) {
      dispatch(fetchShipmentStatus(trackingNumber));
    }
  }, [trackingNumber, dispatch]);

  const handleInputChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const handleTrackShipment = () => {
    if (trackingNumber) {
      dispatch(fetchShipmentStatus(trackingNumber));
    }
  };

  return (
    <div className="shipment-tracker">
      <h2>2>
      <div className="tracker-input">
        <input
          type="text"
          value={trackingNumber}
          onChange={handleInputChange}
          placeholder="Enter Tracking Number"
        />
        <button onClick={handleTrackShipment}>Track</button>
      </div>
      {shipmentStatus.loading && <p>...</p>}
      {shipmentStatus.error && <p>Error: {shipmentStatus.error}</p>}
      {shipmentStatus.data && (
        <div className="shipment-details">
          <h3>Shipment Details</h3>
          <p>Status: {shipmentStatus.data.status}</p>
          <p>shipmentStatus.data.location}</p>
          <p>: {shipmentStatus.data.estimatedDelivery}</p>
        </div>
      )}
    </div>
  );
};

export default ShipmentTracker;
Estimated DeliveryLocation: {</h3>LoadingShipment Tracker</h