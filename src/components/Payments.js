import './Payments.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  addPayment,
  fetchPayments,
  updatePayment,
} from '../store/actions';
import PaymentForm from './PaymentForm';
import PaymentList from './PaymentList';

const Payments = () => {
  const dispatch = useDispatch();
  const payments = useSelector(state => state.payments);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const handleAddPayment = (payment) => {
    dispatch(addPayment(payment));
  };

  const handleUpdatePayment = (payment) => {
    dispatch(updatePayment(payment));
  };

  const handleSelectPayment = (payment) => {
    setSelectedPayment(payment);
  };

  return (
    <div className="payments-container">
      <h1>Payments</h1>
      <PaymentForm 
        onAddPayment={handleAddPayment} 
        onUpdatePayment={handleUpdatePayment} 
        selectedPayment={selectedPayment} 
      />
      <PaymentList 
        payments={payments} 
        onSelectPayment={handleSelectPayment} 
      />
    </div>
  );
};

export default Payments;
</h1>