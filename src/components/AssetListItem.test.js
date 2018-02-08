import React from 'react';
import { render } from '../testutils';
import Table, { TableBody } from 'material-ui/Table';
import { UnconnectedAssetListItem as AssetListItem } from './AssetListItem';
import { Link } from 'react-router-dom';

const Container = ({ children }) => (<Table><TableBody>{ children }</TableBody></Table>);

test('Asset list should show asset name if present', () => {
  const component = <Container><AssetListItem
    asset={{name:'foo', id:'bar'}} assetUrl='xxx' confirmDelete={() => null} /></Container>
  const testInstance = render(component, {url:'/'});
  expect(testInstance.findByProps({ href: '/asset/bar' }).children).toContain('foo');
});

test('Asset list should show asset id if name not present', () => {
  const component = <Container><AssetListItem
    asset={{id:'bar'}} assetUrl='xxx' confirmDelete={() => null} /></Container>
  const testInstance = render(component, {url:'/'});
  expect(testInstance.findByProps({ href: '/asset/bar' }).children).toContain('bar');
});
