import { combineReducers } from 'redux';

import bankAccountsReducer from './reducers/bankAccountsReducer';
import bestRateReducer from './reducers/bestRateReducer';
import billingsReducer from './reducers/billingsReducer';
import carrierSelectionReducer from './reducers/carrierSelectionReducer';
import communicatorReducer from './reducers/communicatorReducer';
import companySettingsReducer from './reducers/companySettingsReducer';
import contactsReducer from './reducers/contactsReducer';
import documentScannerReducer from './reducers/documentScannerReducer';
import exceptionHandlerReducer from './reducers/exceptionHandlerReducer';
import fleetReducer from './reducers/fleetReducer';
import modulesSettingsReducer from './reducers/modulesSettingsReducer';
import otherComponentsReducer from './reducers/otherComponentsReducer';
import paymentsReducer from './reducers/paymentsReducer';
import pricingReducer from './reducers/pricingReducer';
import shipmentStatusReducer from './reducers/shipmentStatusReducer';
import shipmentTrackerReducer from './reducers/shipmentTrackerReducer';
import shipmentVerificationReducer
  from './reducers/shipmentVerificationReducer';
import shippingLabelGeneratorReducer
  from './reducers/shippingLabelGeneratorReducer';
import systemReducer from './reducers/systemReducer';
import transportsReducer from './reducers/transportsReducer';
import userSettingsReducer from './reducers/userSettingsReducer';
import usersGroupsReducer from './reducers/usersGroupsReducer';

const rootReducer = combineReducers({
  documentScanner: documentScannerReducer,
  shipmentVerification: shipmentVerificationReducer,
  bestRate: bestRateReducer,
  carrierSelection: carrierSelectionReducer,
  exceptionHandler: exceptionHandlerReducer,
  shipmentStatus: shipmentStatusReducer,
  shipmentTracker: shipmentTrackerReducer,
  shippingLabelGenerator: shippingLabelGeneratorReducer,
  userSettings: userSettingsReducer,
  companySettings: companySettingsReducer,
  modulesSettings: modulesSettingsReducer,
  usersGroups: usersGroupsReducer,
  contacts: contactsReducer,
  transports: transportsReducer,
  bankAccounts: bankAccountsReducer,
  billings: billingsReducer,
  system: systemReducer,
  fleet: fleetReducer,
  payments: paymentsReducer,
  pricing: pricingReducer,
  communicator: communicatorReducer,
  otherComponents: otherComponentsReducer,
});

export default rootReducer;
