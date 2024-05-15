import './ModulesSettings.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  fetchModuleSettings,
  updateModuleSettings,
} from '../store/actions';

const ModulesSettings = () => {
  const dispatch = useDispatch();
  const moduleSettings = useSelector(state => state.moduleSettings);
  const [settings, setSettings] = useState(moduleSettings);

  useEffect(() => {
    dispatch(fetchModuleSettings());
  }, [dispatch]);

  useEffect(() => {
    setSettings(moduleSettings);
  }, [moduleSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateModuleSettings(settings));
  };

  return (
    <div className="modules-settings">
      <h2>Modules Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="documentScanner">Document Scanner</label>
          <input
            type="checkbox"
            id="documentScanner"
            name="documentScanner"
            checked={settings.documentScanner}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shipmentVerification">Shipment Verification</label>
          <input
            type="checkbox"
            id="shipmentVerification"
            name="shipmentVerification"
            checked={settings.shipmentVerification}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bestRate">Best Rate</label>
          <input
            type="checkbox"
            id="bestRate"
            name="bestRate"
            checked={settings.bestRate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="carrierSelection">Carrier Selection</label>
          <input
            type="checkbox"
            id="carrierSelection"
            name="carrierSelection"
            checked={settings.carrierSelection}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exceptionHandler">Exception Handler</label>
          <input
            type="checkbox"
            id="exceptionHandler"
            name="exceptionHandler"
            checked={settings.exceptionHandler}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shipmentStatus">Shipment Status</label>
          <input
            type="checkbox"
            id="shipmentStatus"
            name="shipmentStatus"
            checked={settings.shipmentStatus}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shipmentTracker">Shipment Tracker</label>
          <input
            type="checkbox"
            id="shipmentTracker"
            name="shipmentTracker"
            checked={settings.shipmentTracker}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shippingLabelGenerator">Shipping Label Generator</label>
          <input
            type="checkbox"
            id="shippingLabelGenerator"
            name="shippingLabelGenerator"
            checked={settings.shippingLabelGenerator}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default ModulesSettings;
</h2>