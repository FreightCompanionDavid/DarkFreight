import {
  COMMUNICATE,
  FETCH_BEST_RATE,
  GENERATE_SHIPPING_LABEL,
  HANDLE_EXCEPTION,
  SCAN_DOCUMENT,
  SELECT_CARRIER,
  TRACK_SHIPMENT,
  UPDATE_BANK_ACCOUNTS,
  UPDATE_BILLINGS,
  UPDATE_COMPANY_SETTINGS,
  UPDATE_CONTACTS,
  UPDATE_FLEET,
  UPDATE_MODULES_SETTINGS,
  UPDATE_PAYMENTS,
  UPDATE_PRICING,
  UPDATE_SHIPMENT_STATUS,
  UPDATE_SYSTEM,
  UPDATE_TRANSPORTS,
  UPDATE_USER_SETTINGS,
  UPDATE_USERS_GROUPS,
  VERIFY_SHIPMENT,
} from './actionTypes';

// Action to scan a document
export const scanDocument = (document) => ({
  type: SCAN_DOCUMENT,
  payload: document
});

// Action to verify shipment
export const verifyShipment = (shipmentDetails) => ({
  type: VERIFY_SHIPMENT,
  payload: shipmentDetails
});

// Action to update shipment status
export const updateShipmentStatus = (status) => ({
  type: UPDATE_SHIPMENT_STATUS,
  payload: status
});

// Action to fetch the best rate
export const fetchBestRate = (rateDetails) => ({
  type: FETCH_BEST_RATE,
  payload: rateDetails
});

// Action to select a carrier
export const selectCarrier = (carrier) => ({
  type: SELECT_CARRIER,
  payload: carrier
});

// Action to handle exceptions
export const handleException = (exception) => ({
  type: HANDLE_EXCEPTION,
  payload: exception
});

// Action to track shipment
export const trackShipment = (trackingDetails) => ({
  type: TRACK_SHIPMENT,
  payload: trackingDetails
});

// Action to generate shipping label
export const generateShippingLabel = (labelDetails) => ({
  type: GENERATE_SHIPPING_LABEL,
  payload: labelDetails
});

// Action to update user settings
export const updateUserSettings = (settings) => ({
  type: UPDATE_USER_SETTINGS,
  payload: settings
});

// Action to update company settings
export const updateCompanySettings = (settings) => ({
  type: UPDATE_COMPANY_SETTINGS,
  payload: settings
});

// Action to update modules settings
export const updateModulesSettings = (settings) => ({
  type: UPDATE_MODULES_SETTINGS,
  payload: settings
});

// Action to update users groups
export const updateUsersGroups = (groups) => ({
  type: UPDATE_USERS_GROUPS,
  payload: groups
});

// Action to update contacts
export const updateContacts = (contacts) => ({
  type: UPDATE_CONTACTS,
  payload: contacts
});

// Action to update transports
export const updateTransports = (transports) => ({
  type: UPDATE_TRANSPORTS,
  payload: transports
});

// Action to update bank accounts
export const updateBankAccounts = (accounts) => ({
  type: UPDATE_BANK_ACCOUNTS,
  payload: accounts
});

// Action to update billings
export const updateBillings = (billings) => ({
  type: UPDATE_BILLINGS,
  payload: billings
});

// Action to update system settings
export const updateSystem = (system) => ({
  type: UPDATE_SYSTEM,
  payload: system
});

// Action to update fleet
export const updateFleet = (fleet) => ({
  type: UPDATE_FLEET,
  payload: fleet
});

// Action to update payments
export const updatePayments = (payments) => ({
  type: UPDATE_PAYMENTS,
  payload: payments
});

// Action to update pricing
export const updatePricing = (pricing) => ({
  type: UPDATE_PRICING,
  payload: pricing
});

// Action to communicate
export const communicate = (message) => ({
  type: COMMUNICATE,
  payload: message
});
