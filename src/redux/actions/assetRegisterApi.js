import { RSAA } from 'redux-api-middleware';

export const ASSETS_LIST_REQUEST = Symbol('ASSETS_LIST_REQUEST');
export const ASSETS_LIST_SUCCESS = Symbol('ASSETS_LIST_SUCCESS');

export const ASSETS_DELETE_SUCCESS = Symbol('ASSETS_DELETE_SUCCESS');
export const ASSETS_DELETE_REQUEST = Symbol('ASSETS_DELETE_REQUEST');

export const ASSETS_API_FAILURE = Symbol('ASSETS_API_FAILURE');

export const getAssetList = () => ({
  [RSAA]: {
    endpoint: 'http://localhost:8080/assets/',
    method: 'GET',
    types: [ASSETS_LIST_REQUEST, ASSETS_LIST_SUCCESS, ASSETS_API_FAILURE]
  }
});

export const deleteAsset = (id) => ({
  [RSAA]: {
    endpoint: 'http://localhost:8080/assets/' + id + '/',
    method: 'DELETE',
    types: [
      ASSETS_DELETE_REQUEST, { type: ASSETS_DELETE_SUCCESS, meta: { id } }, ASSETS_API_FAILURE
    ]
  }
});
