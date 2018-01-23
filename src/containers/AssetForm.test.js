import React from 'react';
import { AppBar } from 'material-ui';
import { render } from '../testutils';
import AssetForm from './AssetForm';

test('can render /asset/create', () => {
  const testInstance = render(<AssetForm match={{url: '/asset/create'}}/>);

  expect(testInstance.findByType(AppBar).props.title).toBe('Create new asset')
});
