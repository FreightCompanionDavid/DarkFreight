import './BankAccounts.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  addBankAccount,
  deleteBankAccount,
  fetchBankAccounts,
} from '../store/actions';

const BankAccounts = () => {
  const dispatch = useDispatch();
  const bankAccounts = useSelector(state => state.bankAccounts);
  const [newAccount, setNewAccount] = useState({ accountNumber: '', bankName: '', routingNumber: '' });

  useEffect(() => {
    dispatch(fetchBankAccounts());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleAddAccount = () => {
    dispatch(addBankAccount(newAccount));
    setNewAccount({ accountNumber: '', bankName: '', routingNumber: '' });
  };

  const handleDeleteAccount = (accountId) => {
    dispatch(deleteBankAccount(accountId));
  };

  return (
    <div className="bank-accounts">
      <h2>2>
      <div className="add-account-form">
        <input
          type="text"
          name="accountNumber"
          value={newAccount.accountNumber}
          onChange={handleInputChange}
          placeholder="Account Number"
        />
        <input
          type="text"
          name="bankName"
          value={newAccount.bankName}
          onChange={handleInputChange}
          placeholder="Bank Name"
        />
        <input
          type="text"
          name="routingNumber"
          value={newAccount.routingNumber}
          onChange={handleInputChange}
          placeholder="Routing Number"
        />
        <button onClick={handleAddAccount}>Add Account</button>
      </div>
      <div className="account-list">
        {bankAccounts.map(account => (
          <div key={account.id} className="account-item">
            <span>{account.bankName} - {account.accountNumber}</span>
            <button onClick={() => handleDeleteAccount(account.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankAccounts;
</h2>Bank Accounts</h