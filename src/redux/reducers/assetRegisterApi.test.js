import reducer, { initialState } from './assetRegisterApi';
import { ASSETS_LIST_SUCCESS, ASSETS_DELETE_SUCCESS } from '../actions/assetRegisterApi';

test('asset list response updates state', () => {
  const action = { type: ASSETS_LIST_SUCCESS, payload: {
    next: 'xxx', previous: 'yyy', results: ['a', 'b'] } };
  const nextState = reducer(initialState, action);
  expect(nextState.assets.next).toBe('xxx');
  expect(nextState.assets.previous).toBe('yyy');
  expect(nextState.assets.results).toEqual(['a', 'b']);
});

test('asset delete response deletes asset', () => {
  const previousState = { ...initialState,
    assets: { ...initialState.assets, results: [ {id: 'x'}, {id: 'y'}, {id: 'z'} ] },
  };
  const action = { type: ASSETS_DELETE_SUCCESS, meta: { id: 'y' } };
  const nextState = reducer(previousState, action);
  expect(nextState.assets.results).toEqual([{id: 'x'}, {id: 'z'}]);
});
