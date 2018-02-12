import { RSAA } from 'redux-api-middleware';
import config from "../../config";

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
export const listPeople = (query, limit = 10) => ({
  [RSAA]: {
    endpoint: config.ENDPOINT_PEOPLE + "?approxMatches=true&limit=" + parseInt(limit, 10) + "&query=" + encodeURIComponent(query),
    method: 'GET',
    types: [
      PEOPLE_LIST_REQUEST,
      { type: PEOPLE_LIST_SUCCESS, meta: { query } },
      PEOPLE_LIST_FAILURE
    ]
  }
});

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
