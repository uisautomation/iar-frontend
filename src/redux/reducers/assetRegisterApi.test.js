import reducer, { initialState } from './assetRegisterApi';
import { ASSETS_LIST_SUCCESS, ASSETS_DELETE_SUCCESS } from '../actions/assetRegisterApi';

test('asset list response updates replaces list if url does not match next or prev', () => {
  const previousState = { ...initialState, summaries: [{url: 'x'}, {url: 'y'}] };
  const action = { type: ASSETS_LIST_SUCCESS, meta: { url: 'zzz' }, payload: {
    next: 'xxx', previous: 'yyy', results: [{url: 'a', x: 1}, {url: 'b', x: 2}] } };
  const nextState = reducer(initialState, action);
  expect(nextState.next).toBe('xxx');
  expect(nextState.previous).toBe('yyy');
  expect(nextState.summaries).toEqual([{url: 'a'}, {url: 'b'}]);
  expect(nextState.assetsByUrl.get('a')).toEqual({url: 'a', x: 1});
  expect(nextState.assetsByUrl.get('b')).toEqual({url: 'b', x: 2});
});

test('asset delete response deletes asset', () => {
  const previousState = { ...initialState, summaries: [{url: 'x'}, {url: 'y'}, {url: 'z'}] };
  const action = { type: ASSETS_DELETE_SUCCESS, meta: { url: 'y' } };
  const nextState = reducer(previousState, action);
  expect(nextState.summaries).toEqual([{url: 'x'}, {url: 'z'}]);
});
