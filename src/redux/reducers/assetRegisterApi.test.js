import reducer, { initialState } from './assetRegisterApi';
import {
  ASSETS_LIST_SUCCESS, ASSETS_DELETE_SUCCESS,
  ASSET_PUT_SUCCESS, ASSET_POST_SUCCESS,
  resetAssets,
} from '../actions/assetRegisterApi';

// A redux store state which contains some fetched assets
let stateWithAssets;

beforeEach(() => {
  stateWithAssets = {
    ...initialState,
    url: 'x', next: 'y', previous: 'z', fetchedAt: new Date(),
    summaries: [{url: 'x'}, {url: 'y'}, {url: 'z'}],
    assetsByUrl: new Map([
      ['x', {url: 'x', id: 'xxx', name: 'foo'}],
      ['y', {url: 'y', id: 'yyy', name: 'bar'}],
      ['z', {url: 'z', id: 'zzz', name: 'buzz'}],
    ]),
  };
});

test('asset list response updates replaces list if url does not match next or prev', () => {
  const previousState = { ...initialState, summaries: [{url: 'x'}, {url: 'y'}] };
  const action = { type: ASSETS_LIST_SUCCESS, meta: { url: 'zzz' }, payload: {
    next: 'xxx', previous: 'yyy', results: [{url: 'a', x: 1}, {url: 'b', x: 2}] } };
  const nextState = reducer(initialState, action);
  expect(nextState.next).toBe('xxx');
  expect(nextState.previous).toBe('yyy');
  expect(nextState.summaries).toEqual([{url: 'a'}, {url: 'b'}]);
  expect(nextState.assetsByUrl.get('a').asset).toEqual({url: 'a', x: 1});
  expect(nextState.assetsByUrl.get('b').asset).toEqual({url: 'b', x: 2});
});

test('asset delete response deletes asset', () => {
  const previousState = { ...initialState, summaries: [{url: 'x'}, {url: 'y'}, {url: 'z'}] };
  const action = { type: ASSETS_DELETE_SUCCESS, meta: { url: 'y' } };
  const nextState = reducer(previousState, action);
  expect(nextState.summaries).toEqual([{url: 'x'}, {url: 'z'}]);
});

test('PUT asset resets summary state', () => {
  const action = { type: ASSET_PUT_SUCCESS, payload: { url: 'y', id: 'y' }, meta: { url: 'y' } };
  const nextState = reducer(stateWithAssets, action);
  expect(nextState.url).toBeNull();
  expect(nextState.next).toBeNull();
  expect(nextState.previous).toBeNull();
  expect(nextState.fetchedAt).toBeNull();
});

test('POST asset resets summary state', () => {
  const action = { type: ASSET_POST_SUCCESS, payload: { url: 'y', id: 'y' }, meta: { url: 'y' } };
  const nextState = reducer(stateWithAssets, action);
  expect(nextState.url).toBeNull();
  expect(nextState.next).toBeNull();
  expect(nextState.previous).toBeNull();
  expect(nextState.fetchedAt).toBeNull();
});

test('PUT asset updates assetsByUrl', () => {
  const action = { type: ASSET_PUT_SUCCESS, payload: { url: 'a', id: 'y' }, meta: { url: 'a' } };
  const nextState = reducer(stateWithAssets, action);
  expect(nextState.assetsByUrl.get('a')).toBeDefined();
});

test('POST asset updates assetsByUrl', () => {
  const action = { type: ASSET_POST_SUCCESS, payload: { url: 'a', id: 'y' }, meta: { url: 'a' } };
  const nextState = reducer(stateWithAssets, action);
  expect(nextState.assetsByUrl.get('a')).toBeDefined();
});

test('Explicit reset of summary state', () => {
  const action = resetAssets();
  const nextState = reducer(stateWithAssets, action);
  expect(nextState.url).toBeNull();
  expect(nextState.next).toBeNull();
  expect(nextState.previous).toBeNull();
  expect(nextState.fetchedAt).toBeNull();
});
