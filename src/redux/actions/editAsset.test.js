import '../../test/mock-localstorage';

// mock the assetRegisterApi actions module
jest.mock('./assetRegisterApi', () => {
  const original = require.requireActual('./assetRegisterApi');
  return {
    ...original,
    getAsset: jest.fn(() => ({ type: 'mock-get-asset-action' })),
    putAsset: jest.fn(() => ({ type: 'mock-put-asset-action' })),
    postAsset: jest.fn(() => ({ type: 'mock-post-asset-action' })),
  };
});

// mock the assets utility module
jest.mock('../../assets', () => {
  const original = require.requireActual('../../assets');
  return {
    ...original,
    sanitise: jest.fn(draft => draft),
  };
});

import globalReducer from '../reducers';
import { DEFAULT_INITIAL_STATE } from '../../testutils';
import {
  SET_DRAFT, PATCH_DRAFT, FETCH_DRAFT_REQUEST, FETCH_DRAFT_SUCCESS, SAVE_DRAFT_SUCCESS,
  fetchOrCreateDraft, saveDraft, DEFAULT_ASSET
} from './editAsset';

import {
  ASSET_GET_REQUEST, ASSET_GET_SUCCESS,
  getAsset, putAsset, postAsset,
} from './assetRegisterApi';
import { sanitise } from '../../assets';

// mock GET-ing an asset. Returns new state.
const mockGetAsset = (state, url, asset) => {
  state = globalReducer(state, { type: ASSET_GET_REQUEST, meta: { url } });
  state = globalReducer(state, { type: ASSET_GET_SUCCESS, payload: asset, meta: { url } });
  expect(state.assets.assetsByUrl.get(url)).toBeDefined();
  expect(state.assets.assetsByUrl.get(url).asset).toBe(asset);
  return state;
};

beforeEach(() => {
  getAsset.mockClear();
  putAsset.mockClear();
  postAsset.mockClear();
  sanitise.mockClear();
});

describe('fetchOrCreateDraft', () => {
  let dispatch, state;
  const getState = () => state;

  beforeEach(() => {
    dispatch = jest.fn();
    state = DEFAULT_INITIAL_STATE;
  });

  test('returns a thunk', () => {
    expect(typeof fetchOrCreateDraft()).toBe('function');
  });

  test('dispatches a SET_DRAFT action if no URL provided', () => {
    fetchOrCreateDraft()(dispatch, getState);
    expect(dispatch).toHaveBeenCalled();
    const action = dispatch.mock.calls[0][0];
    expect(action.type).toBe(SET_DRAFT);
  });

  test('dispatches a SET_DRAFT action if there is an asset in the store already', () => {
    const mockAsset = { url: 'http://iar.invalid/xxx', id: 'xxx', name: 'mock' };
    expect(state.assets.assetsByUrl.get(mockAsset.url)).not.toBeDefined();
    state = mockGetAsset(state, mockAsset.url, mockAsset);
    fetchOrCreateDraft(mockAsset.url)(dispatch, getState);
    expect(dispatch).toHaveBeenCalled();
    const action = dispatch.mock.calls[0][0];
    expect(action.type).toBe(SET_DRAFT);
  });

  describe('when fetching a new asset', () => {
    let fetchPromise, mockAsset;

    beforeEach(() => {
      // We replace dispatch with a function which returns a promise which is immediately resolved.
      // We do this because, in the real app, the getAsset action returns a promise from
      // dispatch().
      dispatch = jest.fn(() => new Promise(resolve => resolve()));

      mockAsset = { url: 'http://iar.invalid/xxx', id: 'xxx', name: 'mock' };
      expect(state.assets.assetsByUrl.get(mockAsset.url)).not.toBeDefined();

      // change getAsset to update the store with the mock asset
      getAsset.mockImplementationOnce(url => {
        expect(url).toBe(mockAsset.url);
        state = mockGetAsset(state, url, mockAsset);
        return { type: 'mock-get-asset-action' };
      });

      fetchOrCreateDraft(mockAsset.url)(dispatch, getState);
    });

    test('calls dispatch three times', () => {
      expect(dispatch).toHaveBeenCalledTimes(3);
    });

    test('dispatches a FETCH_DRAFT_REQUEST', () => {
      const requestAction = dispatch.mock.calls[0][0];
      expect(requestAction.type).toBe(FETCH_DRAFT_REQUEST);
    });

    test('dispatches a GET_ASSET request', () => {
      const requestAction = dispatch.mock.calls[1][0];
      expect(requestAction.type).toBe('mock-get-asset-action');
      expect(getAsset).toHaveBeenCalledWith(mockAsset.url);
    });

    test('dispatches a FETCH_DRAFT_SUCCESS', () => {
      const requestAction = dispatch.mock.calls[2][0];
      expect(requestAction.type).toBe(FETCH_DRAFT_SUCCESS);
      expect(requestAction.payload.asset).toBe(mockAsset);
    });
  });
});

describe('saveDraft', () => {
  let draft, getState, dispatch;

  beforeEach(() => {
    draft = { ...DEFAULT_ASSET, department: 'INSTA' };

    // mock up enough of the editAsset state for the actions to work.
    getState = () => ({
      editAsset: { draft },
    });

    // mock the dispatch function
    dispatch = jest.fn(value => Promise.resolve(value));
  });

  test('is a thunk', () => {
    expect(typeof saveDraft()).toBe('function');
  });

  test('calls sanitise on the draft before saving', () => {
    saveDraft()(dispatch, getState);
    expect(sanitise).toHaveBeenCalledWith(draft);
  });

  describe('when given draft with URL', () => {
    beforeEach(() => {
      draft.url = 'http://iar-backend.invalid/xxx';
    });

    test('PUTs it', () => {
      saveDraft()(dispatch, getState);
      expect(putAsset).toHaveBeenCalledWith(draft);
      expect(dispatch).toHaveBeenCalledWith({ type: 'mock-put-asset-action' });
    });

    test('PUTs the sanitised draft', () => {
      const sanitisedDraft = { name: 'test draft' };
      sanitise.mockImplementationOnce(() => sanitisedDraft);
      saveDraft()(dispatch, getState);
      expect(putAsset).toHaveBeenCalledWith(sanitisedDraft);
    });

    test('dispatches a SAVE_DRAFT_SUCCESS after', () => {
      saveDraft()(dispatch, getState).then(() => {
        expect(dispatch).toHaveBeenLastCalledWith({ type: SAVE_DRAFT_SUCCESS });
      });
    });
  });

  describe('when given draft with no URL', () => {
    test('POSTs it', () => {
      saveDraft()(dispatch, getState);
      expect(postAsset).toHaveBeenCalledWith(draft);
      expect(dispatch).toHaveBeenCalledWith({ type: 'mock-post-asset-action' });
    });

    test('POSTs the sanitised draft', () => {
      const sanitisedDraft = { name: 'test draft' };
      sanitise.mockImplementationOnce(() => sanitisedDraft);
      saveDraft()(dispatch, getState);
      expect(postAsset).toHaveBeenCalledWith(sanitisedDraft);
    });

    test('dispatches SAVE_DRAFT_SUCCESS afterwards', () => {
      saveDraft()(dispatch, getState).then(() => {
        expect(dispatch).toHaveBeenLastCalledWith({ type: SAVE_DRAFT_SUCCESS });
      });
    });
  });
});
