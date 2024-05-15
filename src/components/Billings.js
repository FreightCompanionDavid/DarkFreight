import './Billings.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  addBilling,
  deleteBilling,
  fetchBillings,
  updateBilling,
} from '../store/actions';

const Billings = () => {
  const dispatch = useDispatch();
  const billings = useSelector(state => state.billings);
  const [newBilling, setNewBilling] = useState({ description: '', amount: '' });

  useEffect(() => {
    dispatch(fetchBillings());
  }, [dispatch]);

  const handleAddBilling = () => {
    dispatch(addBilling(newBilling));
    setNewBilling({ description: '', amount: '' });
  };

  const handleUpdateBilling = (id, updatedBilling) => {
    dispatch(updateBilling(id, updatedBilling));
  };

  const handleDeleteBilling = (id) => {
    dispatch(deleteBilling(id));
  };

  return (
    <div className="billings-container">
      <h1></h1>
      <div className="billing-form">
        <input
          type="text"
          placeholder="Description"
          value={newBilling.description}
          onChange={(e) => setNewBilling({ ...newBilling, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newBilling.amount}
          onChange={(e) => setNewBilling({ ...newBilling, amount: e.target.value })}
        />
        <button onClick={handleAddBilling}>Add Billing</button>
      </div>
      <div className="billing-list">
        {billings.map(billing => (
          <div key={billing.id} className="billing-item">
            <span>{billing.description}</span>
            <span>{billing.amount}</span>
            <button onClick={() => handleUpdateBilling(billing.id, { ...billing, amount: billing.amount + 10 })}>Update</button>
            <button onClick={() => handleDeleteBilling(billing.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Billings;
Billings