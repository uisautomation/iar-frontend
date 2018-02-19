// mock any components which are troublesome in our test suite
import '../../test/mock-localstorage';

// mock the underlying reducer returned by combineReducers() since we care only about the wrapped
// reducer behaviour
jest.mock('redux', () => {
  const original = require.requireActual('redux');
  const mockReducers = jest.fn();
  return { ...original, combineReducers: () => mockReducers };
});

import { combineReducers } from 'redux';
import wrappedReducers, { reducers } from './index';
import { LOGOUT } from 'redux-implicit-oauth2';

const mockReducers = combineReducers();

beforeEach(() => {
  mockReducers.mockClear();
});

test('wrappedReducer passes arguments to reducers', () => {
  wrappedReducers('xxx', { type: 'test' });
  expect(mockReducers.mock.calls).toEqual([['xxx', { type: 'test' }]]);
});

test('wrappedReducer passes undefined as state with logout action', () => {
  wrappedReducers('xxx', { type: LOGOUT });
  expect(mockReducers.mock.calls).toEqual([[undefined, { type: LOGOUT, originalState: 'xxx' }]]);
});
