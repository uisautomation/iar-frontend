import React from 'react';
import { render } from '../testutils';
import { UnconnectedAssetListItem as AssetListItem } from './AssetListItem';
import { Link } from 'react-router-dom';

test('Asset list should show asset name if present', () => {
  const component = <AssetListItem
    asset={{name:'foo', id:'bar'}} assetUrl='xxx' confirmDelete={() => null} />
  const testInstance = render(component, {url:'/'});
  expect(testInstance.findByProps({ href: '/asset/bar' }).children).toContain('foo');
});

test('Asset list should show asset id if name not present', () => {
  const component = <AssetListItem
    asset={{id:'bar'}} assetUrl='xxx' confirmDelete={() => null} />
  const testInstance = render(component, {url:'/'});
  expect(testInstance.findByProps({ href: '/asset/bar' }).children).toContain('bar');
});
