import './System.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  fetchSystemSettings,
  updateSystemSettings,
} from '../store/actions';

const System = () => {
  const dispatch = useDispatch();
  const systemSettings = useSelector(state => state.systemSettings);
  const [settings, setSettings] = useState(systemSettings);

  useEffect(() => {
    dispatch(fetchSystemSettings());
  }, [dispatch]);

  useEffect(() => {
    setSettings(systemSettings);
  }, [systemSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSystemSettings(settings));
  };

  return (
    <div className="system-settings">
      <h2></h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="apiEndpoint">API Endpoint</label>
          <input
            type="text"
            id="apiEndpoint"
            name="apiEndpoint"
            value={settings.apiEndpoint || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ocrService">OCR Service</label>
          <input
            type="text"
            id="ocrService"
            name="ocrService"
            value={settings.ocrService || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="blockchainNode">Blockchain Node</label>
          <input
            type="text"
            id="blockchainNode"
            name="blockchainNode"
            value={settings.blockchainNode || ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default System;
</h2>System Settings