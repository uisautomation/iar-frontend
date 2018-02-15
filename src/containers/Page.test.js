import React from 'react';
import { render } from '../testutils';
import Page from './Page';

// TODO: Pass in withSidebar prop to test whether the correct component is rendered within
test('can render Page component', () => {
  expect(render(<Page />, { url: '/' })).toBeDefined();
});