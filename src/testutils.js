import './test/mock-localstorage.js';

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from './style/CustomMaterialTheme';
import configureMockStore from 'redux-mock-store';
import { middlewares } from './redux/enhancer';
import { initialState as assetsInitialState } from './redux/reducers/assetRegisterApi';
import { initialState as deleteConfirmationInitialState } from './redux/reducers/deleteConfirmation';
import { initialState as snackbarInitialState } from './redux/reducers/snackbar';
import { initialState as lookupApiInitialState } from './redux/reducers/lookupApi';
import { initialState as editAssetInitialState } from './redux/reducers/editAsset';

export const mockStore = configureMockStore(middlewares);

export const DEFAULT_INITIAL_STATE = {
  auth: { isLoggedIn: true },
  assets: assetsInitialState,
  deleteConfirmation: deleteConfirmationInitialState,
  snackbar: snackbarInitialState,
  lookupApi: lookupApiInitialState,
  editAsset: editAssetInitialState,
};

export const createMockStore = (initialState = DEFAULT_INITIAL_STATE) => mockStore(initialState);

/*
  Helper function to render a component for testing. Wraps component in the necessary scaffolding and returns the
  TestInstance for checking.
 */
const render = (component, {store, url = '/', router: Router = MemoryRouter} = {}) => {
  if(!store) { store = createMockStore(DEFAULT_INITIAL_STATE); }

  // Make sure this hierarchy reflects that in App.js.
  let wrapped_component = (
    <MuiThemeProvider theme={theme}>
      <IntlProvider locale="en">
        <ReduxProvider store={store}>
          {
            // Wrap the component in a MemoryRouter if url is truthy.
            Boolean(url)
            ? <Router initialEntries={[url]}>{ component }</Router>
            : component
          }
        </ReduxProvider>
      </IntlProvider>
    </MuiThemeProvider>
  );
  return TestRenderer.create(wrapped_component).root;
};

/*
  Helper function that creates a promise that polls for a condition to be true, for up to a second and rejects
  if that condition is never met.
 */
const condition = (cb) => {
  let counter = 0;
  return new Promise((resolve, reject) => {
    let interval = setInterval(function () {
      if (cb()) {
        clearInterval(interval);
        resolve(true);
      } else if (counter ++ == 20) {
        clearInterval(interval);
        reject(false);
      }
    }, 50);
  })
};

export { render, condition }
