import './Contacts.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from '../store/actions';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleAddContact = () => {
    dispatch(addContact(newContact));
    setNewContact({ name: '', email: '', phone: '' });
  };

  const handleUpdateContact = (id, updatedContact) => {
    dispatch(updateContact(id, updatedContact));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="contacts">
      <h2>Contacts</h2>
      <div className="contact-form">
        <input
          type="text"
          name="name"
          value={newContact.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={newContact.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="tel"
          name="phone"
          value={newContact.phone}
          onChange={handleInputChange}
          placeholder="Phone"
        />
        <button onClick={handleAddContact}>Add Contact</button>
      </div>
      <div className="contact-list">
        {contacts.map(contact => (
          <div key={contact.id} className="contact-item">
            <span>{contact.name}</span>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
            <button onClick={() => handleUpdateContact(contact.id, contact)}>Update</button>
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
</h2>