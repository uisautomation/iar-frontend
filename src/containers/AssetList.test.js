import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppBar } from 'material-ui';
import AssetList from './AssetList';

test('can render /assets/dept', () => {
  const testInstance = TestRenderer.create(
    // TODO you should be able to use initialEntries/initialIndex - doesn't seem to add match property
    <MemoryRouter>
      <MuiThemeProvider>
        <AssetList match={{url: '/assets/dept'}}/>
      </MuiThemeProvider>
    </MemoryRouter>
  ).root;

  expect(testInstance.findByType(AppBar).props.title).toBe('Assets: My department')
});

test('can render /assets/edited', () => {
  const testInstance = TestRenderer.create(
    // TODO you should be able to use initialEntries/initialIndex - doesn't seem to add match property
    <MemoryRouter>
      <MuiThemeProvider>
        <AssetList match={{url: '/assets/edited'}}/>
      </MuiThemeProvider>
    </MemoryRouter>
  ).root;

  expect(testInstance.findByType(AppBar).props.title).toBe('Assets: Edited recently')
});

test('can render /assets/all', () => {
  const testInstance = TestRenderer.create(
    // TODO you should be able to use initialEntries/initialIndex - doesn't seem to add match property
    <MemoryRouter>
      <MuiThemeProvider>
        <AssetList match={{url: '/assets/all'}}/>
      </MuiThemeProvider>
    </MemoryRouter>
  ).root;

  expect(testInstance.findByType(AppBar).props.title).toBe('Assets: All')
});

