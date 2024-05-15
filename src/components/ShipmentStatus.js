import './ShipmentStatus.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { fetchShipmentStatus } from '../store/actions';

const ShipmentStatus = () => {
  const dispatch = useDispatch();
  const shipmentStatus = useSelector(state => state.shipmentStatus);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchShipmentStatus())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <div className="shipment-status">Loading...</div>;
  }

  if (!shipmentStatus || shipmentStatus.length === 0) {
    return <div className="shipment-status">No shipment status available.</div>;
  }

  return (
    <div className="shipment-status">
      <h2></h2>
      <ul>
        {shipmentStatus.map((status, index) => (
          <li key={index}>
            <div><strong> ID:</strong> {status.id}</div>
            <div><strong>Status:</strong> {status.status}</div>
            <div><strong>> {new Date(status.updatedAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipmentStatus;
Last Updated:</strongShipment</h2>Shipment Status