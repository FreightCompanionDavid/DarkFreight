import React from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import BankAccounts from './components/BankAccounts';
import BestRate from './components/BestRate';
import Billings from './components/Billings';
import CarrierSelection from './components/CarrierSelection';
import Communicator from './components/Communicator';
import CompanySettings from './components/CompanySettings';
import Contacts from './components/Contacts';
import DocumentScanner from './components/DocumentScanner';
import ExceptionHandler from './components/ExceptionHandler';
import Fleet from './components/Fleet';
import ModulesSettings from './components/ModulesSettings';
import OtherComponents from './components/OtherComponents';
import Payments from './components/Payments';
import Pricing from './components/Pricing';
import ShipmentStatus from './components/ShipmentStatus';
import ShipmentTracker from './components/ShipmentTracker';
import ShipmentVerification from './components/ShipmentVerification';
import ShippingLabelGenerator from './components/ShippingLabelGenerator';
import System from './components/System';
import Transports from './components/Transports';
import UserSettings from './components/UserSettings';
import UsersGroups from './components/UsersGroups';

const Routes = () => (
  <Switch>
    <Route path="/document-scanner" component={DocumentScanner} />
    <Route path="/shipment-verification" component={ShipmentVerification} />
    <Route path="/best-rate" component={BestRate} />
    <Route path="/carrier-selection" component={CarrierSelection} />
    <Route path="/exception-handler" component={ExceptionHandler} />
    <Route path="/shipment-status" component={ShipmentStatus} />
    <Route path="/shipment-tracker" component={ShipmentTracker} />
    <Route path="/shipping-label-generator" component={ShippingLabelGenerator} />
    <Route path="/user-settings" component={UserSettings} />
    <Route path="/company-settings" component={CompanySettings} />
    <Route path="/modules-settings" component={ModulesSettings} />
    <Route path="/users-groups" component={UsersGroups} />
    <Route path="/contacts" component={Contacts} />
    <Route path="/transports" component={Transports} />
    <Route path="/bank-accounts" component={BankAccounts} />
    <Route path="/billings" component={Billings} />
    <Route path="/system" component={System} />
    <Route path="/fleet" component={Fleet} />
    <Route path="/payments" component={Payments} />
    <Route path="/pricing" component={Pricing} />
    <Route path="/communicator" component={Communicator} />
    <Route path="/other-components" component={OtherComponents} />
  </Switch>
);

export default Routes;
