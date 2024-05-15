import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import documentReducer from './store/reducers/documentReducer';
import shipmentReducer from './store/reducers/shipmentReducer';

// Combine all reducers
const rootReducer = combineReducers({
  shipment: shipmentReducer,
  document: documentReducer,
  // Add other reducers here
});

// Create the Redux store with middleware
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
