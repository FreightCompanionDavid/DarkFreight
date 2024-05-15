import './Pricing.css';

import React, { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { fetchPricing } from '../store/actions';

const Pricing = () => {
  const dispatch = useDispatch();
  const pricingData = useSelector(state => state.pricing.data);
  const loading = useSelector(state => state.pricing.loading);
  const error = useSelector(state => state.pricing.error);

  useEffect(() => {
    dispatch(fetchPricing());
  }, [dispatch]);

  if (loading) {
    return <div> return <div>Error: {error}</div>;
  }

  return (
    <div className="pricing-container">
      <h1>        <thead>
          <tr>
            <th> <th>>
          </tr>
        </thead>
        <tbody>
          {pricingData.map((item, index) => (
            <tr key={index}>
              <td>{item.service}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pricing;
Price</thService</th>
           Pricing</h1>
      <table className="pricing-table">
Loading...</div>;
  }

  if (error) {
   