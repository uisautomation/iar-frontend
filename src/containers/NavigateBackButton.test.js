import React from 'react';
import { render } from '../testutils';
import UnconnectedNavigateBackButton from './NavigateBackButton';

// TODO: Mock the history and test whether it correctly navigates back, or redirects if history is null
test('can render NavigateBackButton component', () => {
  expect(render(<UnconnectedNavigateBackButton />, { url: '/' })).toBeDefined();
});