import reducer, { initialState } from './editAsset';
import {
  SET_DRAFT, PATCH_DRAFT, FETCH_DRAFT_REQUEST, FETCH_DRAFT_SUCCESS,
  patchDraft
} from '../actions/editAsset';

let mockDraft, state;

beforeEach(() => {
  mockDraft = { url: 'http://iar.invalid/xxx', url: 'xxx', name: 'yyy' };
  // unset isLoading and isLive to check they are set correctly
  state = { ...initialState, isLoading: undefined, isLive: undefined };
});

describe('a SET_DRAFT action', () => {
  beforeEach(() => {
    state.isLoading = true;
    state.isModified = true;
    state.isLive = false;
    state = reducer(state, { type: SET_DRAFT, payload: { draft: mockDraft } });
  });

  test('sets draft', () => { expect(state.draft).toBe(mockDraft); });
  test('clears isLoading', () => { expect(state.isLoading).toBe(false); });
  test('sets isLive', () => { expect(state.isLive).toBe(true); });
  test('clears isModified', () => { expect(state.isModified).toBe(false); });
});

describe('a FETCH_DRAFT_REQUEST action', () => {
  beforeEach(() => {
    state.isLoading = false;
    state.isModified = true;
    state.isLive = true;
    state = reducer(state, { type: FETCH_DRAFT_REQUEST, payload: { url: mockDraft.url } });
  });

  test('sets draft', () => { expect(state.draft).toEqual({ url: mockDraft.url }); });
  test('sets isLoading', () => { expect(state.isLoading).toBe(true); });
  test('clears isLive', () => { expect(state.isLive).toBe(false); });
  test('clears isModified', () => { expect(state.isModified).toBe(false); });
});

describe('a FETCH_DRAFT_SUCCESS action', () => {
  beforeEach(() => {
    state.isLoading = true;
    state.isModified = true;
    state.isLive = false;
    state = reducer(state, { type: FETCH_DRAFT_SUCCESS, payload: { asset: mockDraft } });
  });

  test('sets draft', () => { expect(state.draft).toEqual(mockDraft); });
  test('clears isLoading', () => { expect(state.isLoading).toBe(false); });
  test('sets isLive', () => { expect(state.isLive).toBe(true); });
  test('clears isModified', () => { expect(state.isModified).toBe(false); });
});

describe('a PATCH_DRAFT action', () => {
  let previousMockDraft, expectedMockDraft;
  beforeEach(() => {
    // shallow copy mock draft
    previousMockDraft = {...mockDraft};
    expectedMockDraft = {...mockDraft};
    state = reducer(state, { type: SET_DRAFT, payload: { draft: previousMockDraft } });
    expect(state.draft).toBe(previousMockDraft);
  });

  test('patches draft with patch object', () => {
    const patch = { foo: 1, bar: 'xxx' };
    expectedMockDraft = { ...expectedMockDraft, ...patch };
    state = reducer(state, patchDraft(patch));
    expect(state.draft).toEqual(expectedMockDraft);
  });

  test('patches draft with patch function', () => {
    const patchFunc = ({ name })  => ({ foo: 1, bar: 'xxx', newName: '>' + name + '<' });
    expect(patchFunc(previousMockDraft).newName).toBe('>' + previousMockDraft.name + '<');
    expectedMockDraft = { ...expectedMockDraft, ...patchFunc(previousMockDraft) };
    state = reducer(state, patchDraft(patchFunc));
    expect(state.draft).toEqual(expectedMockDraft);
  });

  test('sets isModified', () => {
    const patch = { foo: 1, bar: 'xxx' };
    expectedMockDraft = { ...expectedMockDraft, ...patch };
    expect(state.isModified).toBe(false);
    state = reducer(state, patchDraft(patch));
    expect(state.isModified).toBe(true);
  });
});
