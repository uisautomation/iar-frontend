import React from 'react';
import { render } from '../testutils';
import Page from './Page';

test('can render Page component', () => {
  expect(render(<Page />, { url: '/' })).toBeDefined();
});

test('can render Page component with a sidebar', () => {
  expect(render(<Page withSidebar={true}/>, { url: '/' })).toBeDefined();
});

test('can render Page component without a sidebar', () => {
  expect(render(<Page withSidebar={false} />, { url: '/' })).toBeDefined();
});