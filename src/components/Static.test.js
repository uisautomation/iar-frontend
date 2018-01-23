import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppBar } from 'material-ui';
import Static from './Static';

test('can render /static/what-is-asset', () => {
  const testInstance = TestRenderer.create(
    // TODO you should be able to use initialEntries/initialIndex - doesn't seem to add match property
    <MemoryRouter>
      <MuiThemeProvider>
        <Static match={{url: '/static/what-is-asset'}}/>
      </MuiThemeProvider>
    </MemoryRouter>
  ).root;

  expect(testInstance.findByType(AppBar).props.title).toBe('What is an information asset?')
});

test('can render /static/what-i-do', () => {
  const testInstance = TestRenderer.create(
    // TODO you should be able to use initialEntries/initialIndex - doesn't seem to add match property
    <MemoryRouter>
      <MuiThemeProvider>
        <Static match={{url: '/static/what-i-do'}}/>
      </MuiThemeProvider>
    </MemoryRouter>
  ).root;

  expect(testInstance.findByType(AppBar).props.title).toBe('What do I need to do?')
});

test('can render /static/feedback', () => {
  const testInstance = TestRenderer.create(
    // TODO you should be able to use initialEntries/initialIndex - doesn't seem to add match property
    <MemoryRouter>
      <MuiThemeProvider>
        <Static match={{url: '/static/feedback'}}/>
      </MuiThemeProvider>
    </MemoryRouter>
  ).root;

  expect(testInstance.findByType(AppBar).props.title).toBe('Feedback')
});

test('can render /static/contact', () => {
  const testInstance = TestRenderer.create(
    // TODO you should be able to use initialEntries/initialIndex - doesn't seem to add match property
    <MemoryRouter>
      <MuiThemeProvider>
        <Static match={{url: '/static/contact'}}/>
      </MuiThemeProvider>
    </MemoryRouter>
  ).root;

  expect(testInstance.findByType(AppBar).props.title).toBe('Contact')
});

test('can render /static/tcs', () => {
  const testInstance = TestRenderer.create(
    // TODO you should be able to use initialEntries/initialIndex - doesn't seem to add match property
    <MemoryRouter>
      <MuiThemeProvider>
        <Static match={{url: '/static/tcs'}}/>
      </MuiThemeProvider>
    </MemoryRouter>
  ).root;

  expect(testInstance.findByType(AppBar).props.title).toBe('Terms & Conditions')
});

