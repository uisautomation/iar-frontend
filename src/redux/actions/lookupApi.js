import { RSAA } from 'redux-api-middleware';
import config from "../../config";
import assert from "assert";

export const PEOPLE_LIST_REQUEST = Symbol('PEOPLE_LIST_REQUEST');
export const PEOPLE_LIST_SUCCESS = Symbol('PEOPLE_LIST_SUCCESS');
export const PEOPLE_LIST_FAILURE = Symbol('PEOPLE_LIST_FAILURE');

export const PEOPLE_GET_REQUEST = Symbol('PEOPLE_GET_REQUEST');
export const PEOPLE_GET_SUCCESS = Symbol('PEOPLE_GET_SUCCESS');
export const PEOPLE_GET_FAILURE = Symbol('PEOPLE_GET_FAILURE');

/**
 * FIXME
 *
 * @param query
 * @param limit
 * @returns {{}}
 */
export const listPeople = (query, limit = 10) => {
  const the_limit = parseInt(limit, 10);
  if (!the_limit || the_limit <= 0) {
    throw new Error('the limit must be > 0');
  }
  return {
    [RSAA]: {
      endpoint: config.ENDPOINT_PEOPLE + "?limit=" + the_limit + "&query=" + encodeURIComponent(query),
      method: 'GET',
      types: [
        {type: PEOPLE_LIST_REQUEST, meta: {query}},
        {type: PEOPLE_LIST_SUCCESS, meta: {query}},
        {type: PEOPLE_LIST_FAILURE, meta: {query}},
      ]
    }
  }
};

/**
 * FIXME
 *
 * @param crsid
 * @returns {{}}
 */
export const getPeople = (crsid) => ({
  [RSAA]: {
    endpoint: config.ENDPOINT_PEOPLE + '/crsid/' + crsid,
    method: 'GET',
    types: [PEOPLE_GET_REQUEST, PEOPLE_GET_SUCCESS, PEOPLE_GET_FAILURE]
  }
});
