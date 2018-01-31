import React from 'react';
import { AppBar } from 'material-ui';
import { render } from '../testutils';
import RoutedStatic from './RoutedStatic';

test('can render /static/what-is-asset', () => {
  const testInstance = render(<RoutedStatic/>, '/static/what-is-asset');

  expect(testInstance.findByType(AppBar).props.title).toBe('What is an information asset?')
});

test('can render /static/what-i-do', () => {
  const testInstance = render(<RoutedStatic/>, '/static/what-i-do');

  expect(testInstance.findByType(AppBar).props.title).toBe('What do I need to do?')
});

test('can render /static/feedback', () => {
  const testInstance = render(<RoutedStatic/>, '/static/feedback');

  expect(testInstance.findByType(AppBar).props.title).toBe('Feedback')
});

test('can render /static/contact', () => {
  const testInstance = render(<RoutedStatic/>, '/static/contact');

  expect(testInstance.findByType(AppBar).props.title).toBe('Contact')
});

test('can render /static/tcs', () => {
  const testInstance = render(<RoutedStatic/>, '/static/tcs');

  expect(testInstance.findByType(AppBar).props.title).toBe('Terms & Conditions')
});
