import React from 'react';
import ReactDOM from 'react-dom';
import { AppBar } from 'material-ui';
import { render } from '../testutils';
import AssetList from './AssetList';

const mockAssets = [
  { name: 'foo', id: 'abc' },
  { name: 'bar', id: 'def' },
];

test('can render /assets/dept', () => {
  const testInstance = render(<AssetList assets={mockAssets} match={{url: '/assets/dept'}}/>);

  expect(testInstance.findByType(AppBar).props.title).toBe('Assets: My department')
});

test('can render /assets/all', () => {
  const testInstance = render(<AssetList assets={mockAssets} match={{url: '/assets/all'}}/>);

  expect(testInstance.findByType(AppBar).props.title).toBe('Assets: All')
});
