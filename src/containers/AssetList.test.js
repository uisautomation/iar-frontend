// mock any components which are troublesome in our test suite
import '../test/mocks';

// mock the assetRegisterApi actions module
jest.mock('../redux/actions/assetRegisterApi', () => {
  const original = require.requireActual('../redux/actions/assetRegisterApi');
  return {
    ...original,
    getAssets: jest.fn(() => ({ type: 'mock-get-assets-action' })),
  };
});

import React from 'react';
import { render, createMockStore, DEFAULT_INITIAL_STATE } from '../testutils';
import AppRoutes from './AppRoutes';
import { DEFAULT_QUERY } from './AssetList';
import { getAssets, Direction } from '../redux/actions/assetRegisterApi';

beforeEach(() => {
  getAssets.mockClear();
});

// NB: We need to do the full AppRoutes dance here since the match url is used to key the app bar
// title and that must be defined by the AppBar's prop types. Should the AppBar title logic be
// re-worked, we can move to testing the AssetList component directly.

test('AssetList can render', () => {
  const testInstance = render(<AppRoutes />, { url: '/assets/all' });
});

test('AssetList sends a default query if none is set', () => {
  const store = createMockStore(DEFAULT_INITIAL_STATE);
  const testInstance = render(<AppRoutes />, { store, url: '/assets/all' });

  // getAssets was called once
  expect(getAssets.mock.calls).toHaveLength(1);

  // get single argument to getAssets
  const [ [ query ] ] = getAssets.mock.calls;

  // check query matches default query
  Object.getOwnPropertyNames(DEFAULT_QUERY).forEach(name => {
    expect(query[name]).toEqual(DEFAULT_QUERY[name]);
  });
});

test('AssetList respects the current query', () => {
  const initialState = { ...DEFAULT_INITIAL_STATE };
  const initialQuery = {
    ...initialState.assets.query,
    sort: { field: 'name', direction: Direction.descending }
  };
  initialState.assets = { ...initialState.assets, query: initialQuery };

  const store = createMockStore(initialState);
  const testInstance = render(<AppRoutes />, { store, url: '/assets/all' });

  // getAssets was called once
  expect(getAssets.mock.calls).toHaveLength(1);

  // get single argument to getAssets
  const [ [ query ] ] = getAssets.mock.calls;

  // check query matches expected query
  Object.getOwnPropertyNames(initialQuery).forEach(name => {
    expect(query[name]).toEqual(initialQuery[name]);
  });
});
