// mock any components which are troublesome in our test suite
import '../test/mocks';

import React from 'react';
import { AppBar, Typography } from 'material-ui';
import { render } from '../testutils';
import AppRoutes from './AppRoutes';
import NotFoundPage from './NotFoundPage';

const appBarTitle = testInstance => (
  testInstance.findByType(AppBar).findByType(Typography).props.children
);

/**
 * Simple unit test which assert that routes generate pages with the correct titles.
 */

test('can render /help', () => {
  const testInstance = render(<AppRoutes/>, {url: '/help'});

  expect(appBarTitle(testInstance)).toBe('Help')
});

test('can render /assets/dept', () => {
  const testInstance = render(<AppRoutes/>, {url: '/assets/dept'});

  expect(appBarTitle(testInstance)).toBe('Assets: My department')
});

test('can render /assets/all', () => {
  const testInstance = render(<AppRoutes/>, {url: '/assets/all'});

  expect(appBarTitle(testInstance)).toBe('Assets: All')
});

test('/ redirects to /assets/dept', () => {
  const testInstance = render(<AppRoutes/>, {url: '/'});

  expect(appBarTitle(testInstance)).toBe('Assets: My department')
});

test('/this-does-not-exist renders a not found page', () => {
  const testInstance = render(<AppRoutes/>, {url: '/this-does-not-exist'});

  expect(testInstance.findByType(NotFoundPage)).toBeDefined()
});
