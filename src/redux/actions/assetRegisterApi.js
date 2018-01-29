import { RSAA } from 'redux-api-middleware';

export const ASSETS_LIST_REQUEST = Symbol('ASSETS_LIST_REQUEST');
export const ASSETS_LIST_SUCCESS = Symbol('ASSETS_LIST_SUCCESS');
export const ASSETS_LIST_FAILURE = Symbol('ASSETS_LIST_FAILURE');

export const ASSETS_DELETE_SUCCESS = Symbol('ASSETS_DELETE_SUCCESS');
export const ASSETS_DELETE_REQUEST = Symbol('ASSETS_DELETE_REQUEST');
export const ASSETS_DELETE_FAILURE = Symbol('ASSETS_DELETE_FAILURE');

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
