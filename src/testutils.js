import './test/mock-localstorage.js';

import React from 'react';
import { Provider } from 'react-redux';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureMockStore from 'redux-mock-store';
import { middlewares } from './redux/enhancer';
import { initialState as assetsInitialState } from './redux/reducers/assetRegisterApi';
import { initialState as deleteConfirmationInitialState } from './redux/reducers/deleteConfirmation';
import { initialState as snackbarInitialState } from './redux/reducers/snackbar';

export const mockStore = configureMockStore(middlewares);

export const DEFAULT_INITIAL_STATE = {
  auth: { isLoggedIn: true },
  assets: assetsInitialState,
  deleteConfirmation: deleteConfirmationInitialState,
  snackbar: snackbarInitialState,
};

export const createMockStore = (initialState = DEFAULT_INITIAL_STATE) => mockStore(initialState);

/*
  Helper function to render a component for testing. Wraps component in the necessary scaffolding and returns the
  TestInstance for checking.
 */
const render = (component, {store, url} = {}) => {
  if(!store) { store = createMockStore(DEFAULT_INITIAL_STATE); }
  let wrapped_component = (
    <Provider store={store}>
      <MuiThemeProvider>
        { component }
      </MuiThemeProvider>
    </Provider>
  );
  if (url) {
    wrapped_component = <MemoryRouter initialEntries={[url]}>{ wrapped_component }</MemoryRouter>;
  }
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
