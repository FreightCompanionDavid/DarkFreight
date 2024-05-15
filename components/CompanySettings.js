import './CompanySettings.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  fetchCompanySettings,
  updateCompanySettings,
} from '../store/actions';

const CompanySettings = () => {
  const dispatch = useDispatch();
  const companySettings = useSelector(state => state.companySettings);
  const [settings, setSettings] = useState({
    companyName: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
  });

  useEffect(() => {
    dispatch(fetchCompanySettings());
  }, [dispatch]);

  useEffect(() => {
    if (companySettings) {
      setSettings(companySettings);
    }
  }, [companySettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCompanySettings(settings));
  };

  return (
    <div className="company-settings">
      <h2>Company Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={settings.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={settings.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={settings.contactEmail}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactPhone">Contact Phone</label>
          <input
            type="text"
            id="contactPhone"
            name="contactPhone"
            value={settings.contactPhone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default CompanySettings;
</h2>