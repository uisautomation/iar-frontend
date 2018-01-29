import React from 'react';
import { Provider } from 'react-redux';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import localStorage from 'mock-local-storage';
import configureMockStore from 'redux-mock-store';
import { middlewares } from './redux/enhancer';

import './test/mock-localstorage.js';

export const mockStore = configureMockStore(middlewares);

export const DEFAULT_INITIAL_STATE = {
  auth: { isLoggedIn: true },
  iarApi: { assets: [] },
};

/*
  Helper function to render a component for testing. Wraps component in the necessary scaffolding and returns the
  TestInstance for checking.
 */
const render = (component, {initialState = DEFAULT_INITIAL_STATE} = {}) => {
  // TODO you should be able to use initialEntries/initialIndex - doesn't seem to add match property
  return TestRenderer.create(
    <Provider store={mockStore(initialState)}>
      <MemoryRouter>
        <MuiThemeProvider>
          { component }
        </MuiThemeProvider>
      </MemoryRouter>
    </Provider>
  ).root;
};

export { render }
