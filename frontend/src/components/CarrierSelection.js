import './CarrierSelection.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  fetchCarriers,
  selectCarrier,
} from '../store/actions';

const CarrierSelection = () => {
  const dispatch = useDispatch();
  const carriers = useSelector(state => state.carriers);
  const selectedCarrier = useSelector(state => state.selectedCarrier);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCarriers()).then(() => setLoading(false));
  }, [dispatch]);

  const handleCarrierSelect = (carrier) => {
    dispatch(selectCarrier(carrier));
  };

  if (loading) {
    return <div> carriers...</div>;
  }

  return (
    <div className="carrier-selection">
      <h2>Select a Carrier</h2>
      <ul>
        {carriers.map(carrier => (
          <li 
            key={carrier.id} 
            className={selectedCarrier && selectedCarrier.id === carrier.id ? 'selected' : ''}
            onClick={() => handleCarrierSelect(carrier)}
          >
            {carrier.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarrierSelection;
Loading