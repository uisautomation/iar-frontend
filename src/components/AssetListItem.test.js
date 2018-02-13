import React from 'react';
import { render, createMockStore, DEFAULT_INITIAL_STATE } from '../testutils';
import Table, { TableBody } from 'material-ui/Table';
import AssetListItem from './AssetListItem';
import { ASSETS_LIST_SUCCESS } from '../redux/actions/assetRegisterApi';
import reducer from '../redux/reducers';

// AssetListItem-s are TableRows and must be contained within a table body.
const Container = ({ children }) => (<Table><TableBody>{ children }</TableBody></Table>);

const DEFAULT_ASSET_FIXTURE = {
  url: 'xxx', id: 'yyy', name: 'zzz', updated_at: '2006-01-02T15:04:05-0700',
  is_complete: false,
};

// Update state to include a single asset fixture
const stateWithAssetFixture = (
  { state = DEFAULT_INITIAL_STATE, asset = DEFAULT_ASSET_FIXTURE } = {}
) => {
  // synthesise an asset list response action
  const action = {
    type: ASSETS_LIST_SUCCESS,
    payload: { results: [asset], next: null, previous: null },
    meta: { url: 'http://iar-backend.invalid/assets' },
  };
  return reducer(state, action);
};

test('Asset list should show asset name if present', () => {
  const asset = { ...DEFAULT_ASSET_FIXTURE };
  const store = createMockStore(stateWithAssetFixture({ asset }));

  const component = <Container><AssetListItem assetUrl={asset.url} /></Container>
  const testInstance = render(component, { url: '/', store });

  // Look for an element with a text child with the asset name
  expect(testInstance.find(element => element.props.children == [asset.name])).toBeDefined();
});

test('Asset list should show asset id if name not present', () => {
  const asset = { ...DEFAULT_ASSET_FIXTURE };
  delete asset.name;
  const store = createMockStore(stateWithAssetFixture({ asset }));

  const component = <Container><AssetListItem assetUrl={asset.url} /></Container>
  const testInstance = render(component, { url: '/', store });

  // Look for an element with a text child with the asset id
  expect(testInstance.find(element => element.props.children == [asset.id])).toBeDefined();
});
