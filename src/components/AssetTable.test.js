import '../test/mocks';

import React from 'react';

// Provide a mock AssetListItem implementation since we only care that it has the right props set.
jest.mock('./AssetListItem', () => () => <div />);

import AssetListItem from './AssetListItem';
import { UnconnectedAssetTable as AssetTable, ZeroAssetsRow } from './AssetTable';
import { render } from '../testutils';

test('AssetTable contains no AssetListItem if no assets', () => {
  const instance = render(<AssetTable assetSummaries={[]} />);
  expect(instance.findAllByType(AssetListItem)).toEqual([]);
});

test('AssetTable contains a ZeroAssetsRow if no assets', () => {
  const instance = render(<AssetTable assetSummaries={[]} />);
  instance.findByType(ZeroAssetsRow);
});

test('AssetTable does not contain a ZeroAssetsRow if no assets but we are loading', () => {
  const instance = render(<AssetTable isLoadingAssets={true} assetSummaries={[]} />);
  expect(instance.findAllByType(ZeroAssetsRow)).toEqual([]);
});

test('AssetTable contains an AssetListItem for each asset summary', () => {
  const summaries = [{url: 'a'}, {url: 'b'}];
  const instance = render(<AssetTable assetSummaries={summaries} />);
  const items = instance.findAllByType(AssetListItem);
  expect(items).toHaveLength(2);
  summaries.forEach((asset, index) => {
    expect(items[index].props).toMatchObject({ assetUrl: asset.url });
  });
});
