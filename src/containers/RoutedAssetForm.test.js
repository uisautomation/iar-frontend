import React from 'react';
import { AppBar } from 'material-ui';
import fetch_mock from 'fetch-mock';
import { render } from '../testutils';

// need to mock the material-ui checkbox as we get 'TypeError: Cannot read property 'checked' of undefined'
// when rendered with react-test-renderer. see
// https://stackoverflow.com/questions/48465807/why-is-my-renderer-failing-when-using-material-ui-using-jest-and-react-test-rend
jest.mock('material-ui/Checkbox', () => () => <input type='check' />);

import RoutedAssetForm from './RoutedAssetForm';

test('can render /asset/create', () => {

  const testInstance = render(<RoutedAssetForm/>, '/asset/create');

  expect(testInstance.findByType(AppBar).props.title).toBe('Create new asset')
});

test('can render /asset/8722783d-23cc-4130-a0ab-9cc510e4feb7', async () => {

  fetch_mock.get('http://localhost:8000/assets/8722783d-23cc-4130-a0ab-9cc510e4feb7/', {name: 'The Asset'});

  const testInstance = render(<RoutedAssetForm/>, '/asset/8722783d-23cc-4130-a0ab-9cc510e4feb7');

  await new Promise((resolve, reject) => {
    let interval = setInterval(function(){
      if (testInstance.findByType(AppBar).props.title) {
        clearInterval(interval);
        resolve(true);
      }
    }, 100);
  });

  expect(testInstance.findByType(AppBar).props.title).toBe('Editing: The Asset')
});
