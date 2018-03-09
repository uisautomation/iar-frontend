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
      ['x', {asset: {url: 'x', id: 'xxx', name: 'foo'}}],
      ['y', {asset: {url: 'y', id: 'yyy', name: 'bar'}}],
      ['z', {asset: {url: 'z', id: 'zzz', name: 'buzz'}}],
    ]),
  };
});

test('asset list response updates replaces list if url does not match next or prev', () => {
  const action = { type: ASSETS_LIST_SUCCESS, meta: { url: 'zzz' }, payload: {
    next: 'xxx', previous: 'yyy', results: [{url: 'a', name: 'ping'}, {url: 'b', name: 'pong'}] } };
  const nextState = reducer(initialState, action);
  expect(nextState.next).toBe('xxx');
  expect(nextState.previous).toBe('yyy');
  expect(nextState.summaries).toEqual([{url: 'a'}, {url: 'b'}]);
  expect(nextState.assetsByUrl.get('a').asset).toEqual({url: 'a', name: 'ping'});
  expect(nextState.assetsByUrl.get('b').asset).toEqual({url: 'b', name: 'pong'});
});

test('asset delete response deletes asset', () => {
  const previousState = { ...initialState, summaries: [{url: 'x'}, {url: 'y'}, {url: 'z'}] };
  const action = { type: ASSETS_DELETE_SUCCESS, meta: { url: 'y' } };
  const nextState = reducer(previousState, action);
  expect(nextState.summaries).toEqual([{url: 'x'}, {url: 'z'}]);
});

test('PUT asset resets summary state', () => {
  const action = { type: ASSET_PUT_SUCCESS, payload: {url: 'y', id: 'yyy', name: 'cafe'}, meta: { url: 'y' } };
  const nextState = reducer(stateWithAssets, action);
  expect(nextState.url).toBeNull();
  expect(nextState.next).toBeNull();
  expect(nextState.previous).toBeNull();
  expect(nextState.summaries).toEqual([]);
  expect(nextState.assetsByUrl.get('x').asset.name).toEqual('foo');
  expect(nextState.assetsByUrl.get('y').asset.name).toEqual('cafe');
});

test('POST asset resets summary state', () => {
  const action = { type: ASSET_POST_SUCCESS, payload: {url: 'a', id: 'aaa', name: 'bistro'}, meta: { url: 'a' } };
  const nextState = reducer(stateWithAssets, action);
  expect(nextState.url).toBeNull();
  expect(nextState.next).toBeNull();
  expect(nextState.previous).toBeNull();
  expect(nextState.summaries).toEqual([]);
  expect(nextState.assetsByUrl.get('x').asset.name).toEqual('foo');
  expect(nextState.assetsByUrl.get('a').asset).toEqual({url: 'a', id: 'aaa', name: 'bistro'});
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
