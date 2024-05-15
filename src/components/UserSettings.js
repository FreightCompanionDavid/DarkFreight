import './UserSettings.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { updateUserSettings } from '../store/actions';

const UserSettings = () => {
  const dispatch = useDispatch();
  const userSettings = useSelector(state => state.userSettings);
  const [settings, setSettings] = useState(userSettings);

  useEffect(() => {
    setSettings(userSettings);
  }, [userSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserSettings(settings));
  };

  return (
    <div className="user-settings">
      <h2>User Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={settings.username || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={settings.email || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={settings.language || ''}
            onChange={handleChange}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="jp">Japanese</option>
            {/* Add more languages as needed */}
          </select>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default UserSettings;
