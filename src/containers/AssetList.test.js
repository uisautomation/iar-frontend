import React from 'react';
import { AppBar } from 'material-ui';
import { render } from '../testutils';
import AssetList from './AssetList';

test('can render /assets/dept', () => {
  const testInstance = render(<AssetList/>, '/assets/dept');

  expect(testInstance.findByType(AppBar).props.title).toBe('Assets: My department')
});

test('can render /assets/edited', () => {
  const testInstance = render(<AssetList/>, '/assets/edited');

  expect(testInstance.findByType(AppBar).props.title).toBe('Assets: Edited recently')
});

test('can render /assets/all', () => {
  const testInstance = render(<AssetList/>, '/assets/all');

  expect(testInstance.findByType(AppBar).props.title).toBe('Assets: All')
});

