import { RSAA } from 'redux-api-middleware';

export const PEOPLE_LIST_REQUEST = Symbol('PEOPLE_LIST_REQUEST');
export const PEOPLE_LIST_SUCCESS = Symbol('PEOPLE_LIST_SUCCESS');
export const PEOPLE_LIST_FAILURE = Symbol('PEOPLE_LIST_FAILURE');

export const PEOPLE_GET_REQUEST = Symbol('PEOPLE_GET_REQUEST');
export const PEOPLE_GET_SUCCESS = Symbol('PEOPLE_GET_SUCCESS');
export const PEOPLE_GET_FAILURE = Symbol('PEOPLE_GET_FAILURE');

/**
 * Fetch a list of people.
 *
 * @param query the search text used to search for people.
 * @param limit the max size of the list to return (default 10).
 */
export const listPeople = (query, limit = 10) => {
  const the_limit = parseInt(limit, 10);
  if (!the_limit || the_limit <= 0) {
    throw new Error('the limit must be > 0');
  }
  return {
    [RSAA]: {
      endpoint: process.env.REACT_APP_ENDPOINT_PEOPLE + "?limit=" + the_limit + "&query=" + encodeURIComponent(query),
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
 * Fetch a person by their CRSID.
 */
export const getPeople = (crsid) => ({
  [RSAA]: {
    endpoint: process.env.REACT_APP_ENDPOINT_PEOPLE + '/crsid/' + crsid,
    method: 'GET',
    types: [PEOPLE_GET_REQUEST, PEOPLE_GET_SUCCESS, PEOPLE_GET_FAILURE]
  }
});
