import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';

import reducer from './reducers/index.js';

export const myStore = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);
