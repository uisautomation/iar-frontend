import React from 'react';
import { AppBar } from 'material-ui';
import { render } from '../testutils';
import AssetForm from './AssetForm';

test('can render /asset/create', () => {

  // TODO can't get tests running with Checkbox "TypeError: Cannot read property 'checked' of undefined"
  // https://stackoverflow.com/questions/48465807/why-is-my-renderer-failing-when-using-material-ui-using-jest-and-react-test-rend
  // any ideas?
  // const testInstance = render(<AssetForm/>, '/asset/create');

  // expect(testInstance.findByType(AppBar).props.title).toBe('Create new asset')
});
