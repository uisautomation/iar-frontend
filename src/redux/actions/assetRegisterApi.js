import { RSAA } from 'redux-api-middleware';

export const ASSETS_LIST_REQUEST = Symbol('ASSETS_LIST_REQUEST');
export const ASSETS_LIST_SUCCESS = Symbol('ASSETS_LIST_SUCCESS');
export const ASSETS_LIST_FAILURE = Symbol('ASSETS_LIST_FAILURE');

export const ASSETS_DELETE_SUCCESS = Symbol('ASSETS_DELETE_SUCCESS');
export const ASSETS_DELETE_REQUEST = Symbol('ASSETS_DELETE_REQUEST');
export const ASSETS_DELETE_FAILURE = Symbol('ASSETS_DELETE_FAILURE');

export const ASSET_GET_REQUEST = Symbol('ASSET_GET_REQUEST');
export const ASSET_GET_SUCCESS = Symbol('ASSET_GET_SUCCESS');
export const ASSET_GET_FAILURE = Symbol('ASSET_GET_FAILURE');

export const ASSET_PUT_REQUEST = Symbol('ASSET_PUT_REQUEST');
export const ASSET_PUT_SUCCESS = Symbol('ASSET_PUT_SUCCESS');
export const ASSET_PUT_FAILURE = Symbol('ASSET_PUT_FAILURE');

export const ASSET_POST_REQUEST = Symbol('ASSET_POST_REQUEST');
export const ASSET_POST_SUCCESS = Symbol('ASSET_POST_SUCCESS');
export const ASSET_POST_FAILURE = Symbol('ASSET_POST_FAILURE');

/**
 * Request more assets from the API. If URL corresponds to the "next" or "previous" URLs, the list
 * of assets and asset summaries are exteded, otherwise they are replaced.
 */
export const getMoreAssets = (url) => ({
  [RSAA]: {
    endpoint: url,
    method: 'GET',
    types: [
      { type: ASSETS_LIST_REQUEST, meta: { url } },
      { type: ASSETS_LIST_SUCCESS, meta: { url } },
      { type: ASSETS_LIST_FAILURE, meta: { url } },
    ],
  }
});

/**
 * Delete an asset.
 */
export const deleteAsset = (url) => ({
  [RSAA]: {
    endpoint: url,
    method: 'DELETE',
    types: [
      { type: ASSETS_DELETE_REQUEST, meta: { url } },
      { type: ASSETS_DELETE_SUCCESS, meta: { url } },
      { type: ASSETS_DELETE_FAILURE, meta: { url } },
    ]
  }
});

/**
 * Request an individual asset by URL.
 */
export const getAsset = (url) => ({
  [RSAA]: {
    endpoint: url,
    method: 'GET',
    types: [
      { type: ASSET_GET_REQUEST, meta: { url } },
      { type: ASSET_GET_SUCCESS, meta: { url } },
      { type: ASSET_GET_FAILURE, meta: { url } },
    ]
  }
});

/**
 * Update an asset.
 */
export const updateAsset = (url, body) => ({
  [RSAA]: {
    endpoint: url,
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: body,
    types: [
      { type: ASSET_PUT_REQUEST, meta: { url, body } },
        // body added for testing TODO: find a better way of checking body
      { type: ASSET_PUT_SUCCESS, meta: { url } },
      { type: ASSET_PUT_FAILURE, meta: { url } },
    ]
  }
});

/**
 * Create an asset.
 */
export const createAsset = (url, body) => ({
  [RSAA]: {
    endpoint: url,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: body,
    types: [
      { type: ASSET_POST_REQUEST, meta: { url, body } },
        // body added for testing TODO: find a better way of checking body
      { type: ASSET_POST_SUCCESS, meta: { url } },
      { type: ASSET_POST_FAILURE, meta: { url } },
    ]
  }
});
