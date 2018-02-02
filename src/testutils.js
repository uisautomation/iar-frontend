import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

/*
  Helper function to render a component for testing. Wraps component in the necessary scaffolding and returns the
  TestInstance for checking.
 */
const render = (component, url) => {
  let wrapped_component = <MuiThemeProvider>{ component }</MuiThemeProvider>;
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
