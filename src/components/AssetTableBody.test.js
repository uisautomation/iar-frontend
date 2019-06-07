import '../test/mocks';

import React from 'react';
import AssetListItem from './AssetListItem';
import Table from '@material-ui/core/Table';
import AssetTableBody, { ZeroAssetsRow } from './AssetTableBody';
import { render, createMockStore, DEFAULT_INITIAL_STATE } from '../testutils';
import { ASSETS_LIST_SUCCESS, ASSETS_LIST_REQUEST } from '../redux/actions/assetRegisterApi';
import reducer from '../redux/reducers';

const DEFAULT_ASSET_FIXTURE = {
  url: 'xxx', id: 'yyy', name: 'zzz', updated_at: '2006-01-02T15:04:05-0700',
  is_complete: false,
};

// Update state to include a response with assets
const stateWithAssetFixtures = (
  { state = DEFAULT_INITIAL_STATE, assets = []} = {}
) => {
  // synthesise an asset list response action
  const action = {
    type: ASSETS_LIST_SUCCESS,
    payload: { results: assets, next: null, previous: null },
    meta: { url: 'http://iar-backend.invalid/assets' },
  };
  return reducer(state, action);
};

test('AssetTableBody contains no AssetListItem if no assets', () => {
  const store = createMockStore();
  const instance = render(<Table><AssetTableBody /></Table>, { store });
  expect(instance.findAllByType(AssetListItem)).toEqual([]);
});

test('AssetTableBody contains a ZeroAssetsRow if no assets', () => {
  const store = createMockStore(stateWithAssetFixtures());
  const instance = render(<Table><AssetTableBody /></Table>, { store });
  instance.findByType(ZeroAssetsRow); // throws if not present
});

test('AssetTableBody does not contain a ZeroAssetsRow if no assets but we are loading', () => {
  const state = reducer(undefined, { type: ASSETS_LIST_REQUEST, meta: { url: 'xxx' } });
  const store = createMockStore(state);
  const instance = render(<Table><AssetTableBody /></Table>, { store });
  expect(instance.findAllByType(ZeroAssetsRow)).toEqual([]);
});

test('AssetTableBody contains an AssetListItem for each asset summary', () => {
  const assets = [
    { ...DEFAULT_ASSET_FIXTURE, id: 'aa', url: 'a' },
    { ...DEFAULT_ASSET_FIXTURE, id: 'bb', url: 'b' },
  ];
  const store = createMockStore(stateWithAssetFixtures({ assets }));
  const instance = render(<Table><AssetTableBody /></Table>, { store, url: '/' });
  const items = instance.findAllByType(AssetListItem);
  expect(items).toHaveLength(2);
  assets.forEach((asset, index) => {
    expect(items[index].props).toMatchObject({ assetUrl: asset.url });
  });
});
