import React from 'react';
import {render} from '../testutils';
import NavigateBackButton from './NavigateBackButton';

test('can render NavigateBackButton component', () => {
  expect(render(<NavigateBackButton />, { url: '/' })).toBeDefined();
});
