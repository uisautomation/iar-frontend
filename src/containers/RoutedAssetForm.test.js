import React from 'react';
import { AppBar } from 'material-ui';
import { render } from '../testutils';

// need to mock the material-ui checkbox as we get 'TypeError: Cannot read property 'checked' of undefined'
// when rendered with react-test-renderer. see
// https://stackoverflow.com/questions/48465807/why-is-my-renderer-failing-when-using-material-ui-using-jest-and-react-test-rend
jest.mock('material-ui/Checkbox', () => () =><span>checkbox</span>);

import RoutedAssetForm from './RoutedAssetForm';

test('can render /asset/create', () => {

  const testInstance = render(<RoutedAssetForm/>, '/asset/create');

  expect(testInstance.findByType(AppBar).props.title).toBe('Create new asset')
});
