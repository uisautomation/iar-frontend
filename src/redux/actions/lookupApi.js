import { RSAA } from 'redux-api-middleware';
import config from "../../config";
import {ASSETS_LIST_REQUEST} from "./assetRegisterApi";

export const PEOPLE_GET_REQUEST = Symbol('PEOPLE_GET_REQUEST');
export const PEOPLE_GET_SUCCESS = Symbol('PEOPLE_GET_SUCCESS');
export const PEOPLE_GET_FAILURE = Symbol('PEOPLE_GET_FAILURE');

export const SEARCH_GET_REQUEST = Symbol('SEARCH_GET_REQUEST');
export const SEARCH_GET_SUCCESS = Symbol('SEARCH_GET_SUCCESS');
export const SEARCH_GET_FAILURE = Symbol('SEARCH_GET_FAILURE');

/**
 * Request an individual asset by URL.
 */
export const getPerson = (crsid) => ({
  [RSAA]: {
    endpoint: config.ENDPOINT_LOOKUP + 'people/crsid/' + crsid,
    method: 'GET',
    types: [PEOPLE_GET_REQUEST, PEOPLE_GET_SUCCESS, PEOPLE_GET_FAILURE]
  }
});

export const searchPeople = (query, limit = 10) => ({
  [RSAA]: {
    endpoint: config.ENDPOINT_LOOKUP + "search?limit=" + parseInt(limit, 10) + "&query=" + encodeURIComponent(query),
    method: 'GET',
    types: [
      SEARCH_GET_REQUEST,
      { type: SEARCH_GET_SUCCESS, meta: { query } },
      SEARCH_GET_FAILURE
    ]
  }
});
