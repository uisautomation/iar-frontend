import '../test/mocks';

import React from 'react';

// Provide a mock AssetListItem implementation since we only care that it has the right props set.
jest.mock('./AssetListItem', () => () => <div />);

import AssetListItem from './AssetListItem';
import { UnconnectedAssetTableBody as AssetTableBody, ZeroAssetsRow } from './AssetTableBody';
import { render } from '../testutils';

test('AssetTableBody contains no AssetListItem if no assets', () => {
  const instance = render(<AssetTableBody summaries={[]} />);
  expect(instance.findAllByType(AssetListItem)).toEqual([]);
});

test('AssetTableBody contains a ZeroAssetsRow if no assets', () => {
  const instance = render(<AssetTableBody summaries={[]} />);
  instance.findByType(ZeroAssetsRow);
});

test('AssetTableBody does not contain a ZeroAssetsRow if no assets but we are loading', () => {
  const instance = render(<AssetTableBody isLoading={true} summaries={[]} />);
  expect(instance.findAllByType(ZeroAssetsRow)).toEqual([]);
});

test('AssetTableBody contains an AssetListItem for each asset summary', () => {
  const summaries = [{url: 'a'}, {url: 'b'}];
  const instance = render(<AssetTableBody summaries={summaries} />);
  const items = instance.findAllByType(AssetListItem);
  expect(items).toHaveLength(2);
  summaries.forEach((asset, index) => {
    expect(items[index].props).toMatchObject({ assetUrl: asset.url });
  });
});
