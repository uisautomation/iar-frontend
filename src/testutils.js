import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

/*
  Helper function to render a component for testing. Wraps component in the necessary scaffolding and returns the
  TestInstance for checking.
 */
const render = (component, url) => {
  return TestRenderer.create(
    <MemoryRouter initialEntries={[url]}>
      <MuiThemeProvider>
        { component }
      </MuiThemeProvider>
    </MemoryRouter>
  ).root;
};

export { render }
