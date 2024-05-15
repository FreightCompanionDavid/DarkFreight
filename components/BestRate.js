import './BestRate.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { fetchBestRate } from '../store/actions';

const BestRate = () => {
  const dispatch = useDispatch();
  const bestRate = useSelector(state => state.bestRate);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    if (origin && destination && weight) {
      dispatch(fetchBestRate({ origin, destination, weight }));
    }
  }, [origin, destination, weight, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (origin && destination && weight) {
      dispatch(fetchBestRate({ origin, destination, weight }));
    }
  };

  return (
    <div className="best-rate-container">
      <h2>Find the Best Shipping Rate</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="origin">Origin:</label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Best Rate</button>
      </form>
      {bestRate && (
        <div className="rate-result">
          <h3>Rate.rate} {bestRate.currency}</p>
          <p>: {bestRate.carrier}</p>
        </div>
      )}
    </div>
  );
};

export default BestRate;
CarrierBest Rate:</h3>
          <p>{best</h2>