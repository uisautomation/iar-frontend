import { isRSAA, RSAA } from 'redux-api-middleware';
import {
  getAssets, Direction, putAsset, postAsset,
  ASSET_GET_SUCCESS,
  ASSET_PUT_SUCCESS, ASSET_PUT_FAILURE,
  ASSET_POST_SUCCESS, ASSET_POST_FAILURE,
} from './assetRegisterApi';
import splitUrl from "../../test/splitUrl";

// call getAssets() with the passed arguments, calls splitUrl, checks the baseUrl is the assets
// endpoint and returns the queryItems from splitUrl()
const getAssetsAndParse = (...args) => {
  const { [RSAA]: { endpoint = '' } } = getAssets(...args);
  const { baseUrl, queryItems } = splitUrl(endpoint);
  expect(baseUrl).toBe(process.env.REACT_APP_ENDPOINT_ASSETS);
  return queryItems;
};

test('simple call to getAssets just returns assets endpoint', () => {
  const queryItems = getAssetsAndParse();
  expect(queryItems).toHaveLength(1);
  expect(queryItems).toContain('ordering=-created_at');
});

test('adding a search adds an appropriately encoded query parameter', () => {
  const queryItems = getAssetsAndParse({ search: 'one two' });
  expect(queryItems).toHaveLength(2);
  expect(queryItems).toContain('ordering=-created_at');
  expect(queryItems).toContain('search=one%20two');
});

test('can add sort field', () => {
  const queryItems = getAssetsAndParse({ sort: { field: 'name' } });
  expect(queryItems).toEqual(['ordering=-name']);
});

test('can add ascending sort field', () => {
  const queryItems = getAssetsAndParse({ sort: { field: 'name', direction: Direction.ascending } });
  expect(queryItems).toEqual(['ordering=name']);
});

test('can add descending sort field', () => {
  const queryItems = getAssetsAndParse({ sort: { field: 'name', direction: Direction.descending } });
  expect(queryItems).toEqual(['ordering=-name']);
});

test('invalid directions are ignored', () => {
  const queryItems = getAssetsAndParse({ sort: { field: 'name', direction: 'RANDOM' } });
  expect(queryItems).toEqual(['ordering=-name']);
});

test('Can filter by multiple fields with invalid ones being ignored', () => {
  const queryItems = getAssetsAndParse({
    filter: { name: 'xxx', department: 'yyy', badField: 'zzz', ordering: 'aaa', search: 'bbb' }
  });
  expect(queryItems).toHaveLength(3);
  expect(queryItems).toContain('ordering=-created_at');
  expect(queryItems).toContain('department=yyy');
  expect(queryItems).toContain('name=xxx');
});

test('sort, search and filter can be combined together', () => {
  const queryItems = getAssetsAndParse({
    sort: { field: 'name', direction: Direction.descending }, search: 'one two',
    filter: { name: 'a b c', department: 'd e f', no_such_field: 'zzz' }
  });
  expect(queryItems).toHaveLength(4);
  expect(queryItems).toContain('search=one%20two');
  expect(queryItems).toContain('ordering=-name');
  expect(queryItems).toContain('department=d%20e%20f');
  expect(queryItems).toContain('name=a%20b%20c');
});

describe('when creating/editing assets', () => {
  let assetResource

  beforeEach(() => {
    // create mock asset resource
    assetResource = {
      name: 'test',
      id: 'test-id',
      department: 'INSTA',
    };
  });

  describe('putAsset', () => {
    let dispatchMock;

    beforeEach(() => {
      // make sure asset has a url
      assetResource.url = 'http://iar-backend.invalid/assets/' + assetResource.id;

      // mock dispatch to return a successful PUT
      dispatchMock = jest.fn(action => {
        if(isRSAA(action)) {
          // if this was a PUT, return success
          if(action[RSAA].method === 'PUT') { return Promise.resolve({ type: ASSET_PUT_SUCCESS }); }

          // if this was a GET, return success
          if(action[RSAA].method === 'GET') { return Promise.resolve({ type: ASSET_GET_SUCCESS }); }
        }

        // otherwise, just return the action
        console.error('unexpected action', action);
        return action;
      });
    });

    test('returns a thunk', () => {
      expect(typeof putAsset(assetResource)).toBe('function');
    });

    test('dispatches an RSAA action', () => {
      putAsset(assetResource)(dispatchMock);
      expect(dispatchMock).toHaveBeenCalled();
      expect(isRSAA(dispatchMock.mock.calls[0][0])).toBe(true);
    });

    test('resolves to dispatching a GET request', () => {
      expect(putAsset(assetResource)(dispatchMock)).resolves.toMatchObject({
        type: ASSET_GET_SUCCESS
      });
    });

    test('resolves to an error if the request fails', () => {
      const failAction = { type: ASSET_PUT_FAILURE, error: true };
      dispatchMock = jest.fn(action => Promise.resolve(failAction));
      expect(putAsset(assetResource)(dispatchMock)).resolves.toMatchObject({
        type: ASSET_PUT_FAILURE, error: true
      });
    });
  });

  describe('postAsset', () => {
    let dispatchMock;

    beforeEach(() => {
      // mock dispatch to return a successful POST
      dispatchMock = jest.fn(action => {
        if(isRSAA(action)) {
          // if this was a POST, return success
          if(action[RSAA].method === 'POST') { return Promise.resolve({
            type: ASSET_POST_SUCCESS, payload: { url: 'new-asset-url' }
          }); }

          // if this was a GET, return success
          if(action[RSAA].method === 'GET') { return Promise.resolve({
            type: ASSET_GET_SUCCESS, meta: { url: action[RSAA].endpoint }
          }); }
        }

        // otherwise, just return the action
        console.error('unexpected action', action);
        return action;
      });
    });

    test('returns a thunk', () => {
      expect(typeof postAsset(assetResource)).toBe('function');
    });

    test('dispatches an RSAA action', () => {
      postAsset(assetResource)(dispatchMock);
      expect(dispatchMock).toHaveBeenCalled();
      expect(isRSAA(dispatchMock.mock.calls[0][0])).toBe(true);
    });

    test('resolves to dispatching a GET request', () => {
      expect(postAsset(assetResource)(dispatchMock)).resolves.toMatchObject({
        type: ASSET_GET_SUCCESS, meta: { url: 'new-asset-url' },
      });
    });

    test('resolves to an error if the request fails', () => {
      const failAction = { type: ASSET_POST_FAILURE, error: true };
      dispatchMock = jest.fn(action => Promise.resolve(failAction));
      expect(postAsset(assetResource)(dispatchMock)).resolves.toMatchObject({
        type: ASSET_POST_FAILURE, error: true
      });
    });
  });
});
