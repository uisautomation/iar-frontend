import React from 'react';

// Provide a mock AssetListItem implementation since we only care that it has the right props set.
jest.mock('./AssetListItem', () => () => <div />);

import { UnconnectedAssetTable as AssetTable } from './AssetTable';
import AssetListItem from './AssetListItem';
import { render } from '../testutils';

test('AssetTable contains no AssetListItem if no assets', () => {
  const instance = render(<AssetTable assetSummaries={[]} />);
  expect(instance.findAllByType(AssetListItem)).toEqual([]);
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
