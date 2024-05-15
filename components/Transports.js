import './Transports.css';

import React, { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { fetchTransports } from '../store/actions';
import ExceptionHandler from './ExceptionHandler';

const Transports = () => {
  const dispatch = useDispatch();
  const transports = useSelector(state => state.transports.data);
  const loading = useSelector(state => state.transports.loading);
  const error = useSelector(state => state.transports.error);

  useEffect(() => {
    dispatch(fetchTransports());
  }, [dispatch]);

  if (loading) {
    return <div>>;
  }

  if (error) {
    return <ExceptionHandler error={error} />;
  }

  return (
    <div className="transports-container">
      <h1>Available Transports</h1>
      <ul>
        {transports.map(transport => (
          <li key={transport.id}>
            <div className="transport-item">
              <h2>{transport.name}</h2>
              <p>Status: {transport.status}</p>
              <p>transport.capacity}</p>
              <p>: {transport.type}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transports;
TypeCapacity: {</h1>Loading...</div