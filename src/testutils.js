import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

/*
  Helper function to render a component for testing. Wraps component in the necessary scaffolding and returns the
  TestInstance for checking.
 */
const render = (component) => {
  return TestRenderer.create(
    // TODO you should be able to use initialEntries/initialIndex - doesn't seem to add match property
    <MemoryRouter><MuiThemeProvider>{ component }</MuiThemeProvider></MemoryRouter>
  ).root;
};

export { render }
