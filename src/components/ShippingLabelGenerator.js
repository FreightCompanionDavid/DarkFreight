import './ShippingLabelGenerator.css';

import React, { useState } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { generateShippingLabel } from '../store/actions';

const ShippingLabelGenerator = () => {
  const dispatch = useDispatch();
  const [shipmentDetails, setShipmentDetails] = useState({
    sender: '',
    recipient: '',
    address: '',
    weight: '',
    dimensions: '',
  });

  const shippingLabel = useSelector(state => state.shippingLabel);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipmentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(generateShippingLabel(shipmentDetails));
  };

  return (
    <div className="shipping-label-generator">
      <h2>Generate Shipping Label</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label> <input
            type="text"
            name="sender"
            value={shipmentDetails.sender}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label></label>
          <input
            type="text"
            name="recipient"
            value={shipmentDetails.recipient}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label></label>
          <input
            type="text"
            name="address"
            value={shipmentDetails.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label></label>
          <input
            type="text"
            name="weight"
            value={shipmentDetails.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>>
          <input
            type="text"
            name="dimensions"
            value={shipmentDetails.dimensions}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Label'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {shippingLabel && (
        <div className="shipping-label-preview">
          <h3>Shipping Label Preview</h3>
          <pre>{JSON.stringify(shippingLabel, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ShippingLabelGenerator;
</h3>Dimensions</labelWeightAddressRecipientSender</label>
         </h2>