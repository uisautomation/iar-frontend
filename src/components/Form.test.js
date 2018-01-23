import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppBar } from 'material-ui';
import Form from './Form';

test('can render /asset/create', () => {
  const testInstance = TestRenderer.create(
    // TODO you should be able to use initialEntries/initialIndex - doesn't seem to add match property
    <MemoryRouter>
      <MuiThemeProvider>
        <Form match={{url: '/asset/create'}}/>
      </MuiThemeProvider>
    </MemoryRouter>
  ).root;

  expect(testInstance.findByType(AppBar).props.title).toBe('Create new asset')
});
