import React from 'react';
import { AppBar } from 'material-ui';
import { render } from '../testutils';
import RoutedAssetList from './RoutedAssetList';

test('can render /assets/dept', () => {
  const testInstance = render(<RoutedAssetList/>, {url: '/assets/dept'});

  expect(testInstance.findByType(AppBar).props.title).toBe('Assets: My department')
});

test('can render /assets/all', () => {
  const testInstance = render(<RoutedAssetList/>, {url: '/assets/all'});

  expect(testInstance.findByType(AppBar).props.title).toBe('Assets: All')
});
