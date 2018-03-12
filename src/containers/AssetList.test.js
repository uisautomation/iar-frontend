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
import { render, createMockStore } from '../testutils';
import { populatedState } from '../test/fixtures';
import AppRoutes from './AppRoutes';
import { DEFAULT_QUERY } from './AssetList';
import { getAssets, Direction } from '../redux/actions/assetRegisterApi';

let store;

beforeEach(() => {
  getAssets.mockClear();

  // Create a store and state populated with mock assets
  store = createMockStore(populatedState);
});

// NB: We need to do the full AppRoutes dance here since the match url is used to key the app bar
// title and that must be defined by the AppBar's prop types. Should the AppBar title logic be
// re-worked, we can move to testing the AssetList component directly.

test('AssetList can render', () => {
  render(<AppRoutes />, { url: '/assets/', store });
});

test('AssetList sends a default query if none is set', () => {
  const store = createMockStore(populatedState);
  render(<AppRoutes />, { store, url: '/assets/' });

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
  const initialState = { ...populatedState };
  const initialQuery = {
    ...initialState.assets.query,
    sort: { field: 'name', direction: Direction.descending }
  };
  initialState.assets = { ...initialState.assets, query: initialQuery };

  const store = createMockStore(initialState);
  render(<AppRoutes />, { store, url: '/assets', store });

  // getAssets never called as the new query matches the old
  expect(getAssets.mock.calls).toHaveLength(0);
});

// check that a department filter is set
test('A department filter is set', () => {
  render(<AppRoutes />, { url: '/assets/UIS' });

  expect(getAssets.mock.calls).toHaveLength(1);

  const [ [ query ] ] = getAssets.mock.calls;
  expect(query.filter.department).toEqual('UIS');
});
