// mock any components which are troublesome in our test suite
import '../test/mocks';

import React from 'react';
import { AppBar, Typography } from 'material-ui';
import {createMockStore, DEFAULT_INITIAL_STATE, render} from '../testutils';
import { populatedState } from '../test/fixtures';
import AppRoutes from './AppRoutes';
import NotFoundPage from './NotFoundPage';

import { ENDPOINT_ASSETS } from '../redux/actions/assetRegisterApi';

const appBarTitle = testInstance => (
  testInstance.findByType(AppBar).findByType(Typography).props.children
);

let store;

beforeEach(() => {
  // Create a store and state populated with mock assets
  store = createMockStore(populatedState);
});

/**
 * Simple unit test which assert that routes generate pages with the correct titles.
 */

test('can render /help', () => {
  const testInstance = render(<AppRoutes/>, {url: '/help'});

  expect(appBarTitle(testInstance)).toBe('Help')
});

test('can render /assets/INSTA', () => {
  const testInstance = render(<AppRoutes/>, {
    url: '/assets/INSTA',
    store: createMockStore({
      ...populatedState,
      lookupApi: {
        ...populatedState.lookupApi,
        self: {
          ...populatedState.lookupApi.self,
          institutions: [
            {instid: 'INSTA', name: 'Dept of A'}
          ]
        }
      }
    })
  });

  expect(appBarTitle(testInstance)).toBe('Assets: Dept of A')
});

test('can render /assets', () => {
  const testInstance = render(<AppRoutes/>, {url: '/assets', store });

  expect(appBarTitle(testInstance)).toBe('Assets: All institutions')
});

test('/ redirects to /assets/INSTA', () => {
  const testInstance = render(<AppRoutes/>, {url: '/', store });

  expect(appBarTitle(testInstance)).toBe('Assets: Dept of A')
});

test('can render /asset/', () => {
  const testInstance = render(<AppRoutes/>, {url: '/asset/', store});

  // FIXME: fix up this test?
  //expect(appBarTitle(testInstance)).toBe('Create new asset')
});

test('can render /asset/e20f4cd4-9f97-4829-8178-476c7a67eb97', () => {

  const assetsByUrl = new Map([[
    ENDPOINT_ASSETS + 'e20f4cd4-9f97-4829-8178-476c7a67eb97/', {
      asset: {name: 'Super Secret Medical Data'}
    }
  ]]);

  const testInstance = render(<AppRoutes/>, {
    url: '/asset/e20f4cd4-9f97-4829-8178-476c7a67eb97',
    store: createMockStore({...DEFAULT_INITIAL_STATE, assets: {assetsByUrl}})
  });

  // FIXME: fix up this test?
  // expect(appBarTitle(testInstance)).toBe('Editing: Super Secret Medical Data')
});

test('/this-does-not-exist renders a not found page', () => {
  const testInstance = render(<AppRoutes/>, {url: '/this-does-not-exist'});

  expect(testInstance.findByType(NotFoundPage)).toBeDefined()
});
