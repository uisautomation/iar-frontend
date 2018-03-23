import {
  PEOPLE_GET_SELF_FAILURE,
  PEOPLE_GET_SELF_REQUEST, PEOPLE_GET_SELF_RESET, PEOPLE_GET_SELF_SUCCESS,
  PEOPLE_GET_SUCCESS,
  PEOPLE_LIST_SUCCESS,
  INSTITUTIONS_LIST_REQUEST, INSTITUTIONS_LIST_SUCCESS, INSTITUTIONS_LIST_FAILURE
} from '../actions/lookupApi';

import Cache from '../cache';
import { Map as ImmutableMap } from 'immutable';

/**
 * State managed by the lookup API reducers.
 */
export const initialState = {
  // a map of people records retrieved from the lookup api - keyed on crsid
  peopleByCrsid: ImmutableMap(),
  // a cache of arrays of people records returned by the lookup api search endpoint -
  // keyed on the search text that produced the result.
  matchingPeopleByQuery: new Cache({maxSize: 20}),

  // the authenticated user's profile
  self: null,

  // If non-NULL, a JS Date object indicating when the user's profile was last requested.
  selfRequestedAt: null,

  // whether or not the authenticated user's profile is being loaded
  selfLoading: false,

  institutions: {
    // If non-NULL, a JS Date object indicating when this was last fetched.
    fetchedAt: null,

    // If non-NULL, a JS Date object indicating when this was last requested.
    requestedAt: null,

    // If true, a request is currently in flight.
    isLoading: false,

    // If non-null, the last request failed and this contains the payload from the
    // INSTITUTIONS_LIST_FAILURE action.
    errorPayload: null,

    // A map of all institution records keyed by institution id.
    byInstid: ImmutableMap(),
  },
};

export default (state = initialState, action) => {
  switch(action.type) {

    case PEOPLE_LIST_SUCCESS:
      const { query } = action.meta;
      const matchingPeopleByQuery = state.matchingPeopleByQuery.set(query, action.payload.results);
      return { ...state, matchingPeopleByQuery };

    case PEOPLE_GET_SUCCESS:
      // Add the person to the peopleByCrsid map
      const person = action.payload;
      return { ...state, peopleByCrsid: state.peopleByCrsid.set(person.identifier.value, person) };

    case PEOPLE_GET_SELF_REQUEST:
      // use an empty object is indicate loading
      return { ...state, selfLoading: true, selfRequestedAt: new Date() };

    case PEOPLE_GET_SELF_RESET:
      // reset self in case of reset
      return { ...state, self: null, selfLoading: false, selfRequestedAt: null };

    case PEOPLE_GET_SELF_SUCCESS:
      // Add the person to the peopleByCrsid map
      return { ...state, self: action.payload, selfLoading: false};

    case PEOPLE_GET_SELF_FAILURE:
      // reset self in case of failure
      return { ...state, self: null, selfLoading: false };

    case INSTITUTIONS_LIST_REQUEST:
      // An institution request is in flight.
      return {
        ...state,
        institutions: {
          ...state.institutions,
          isLoading: true,
          requestedAt: new Date(),
          fetchedAt: null,
          errorPayload: null,
        },
      };

    case INSTITUTIONS_LIST_SUCCESS:
      // Replace current institution list with returned results
      return {
        ...state,
        institutions: {
          ...state.institutions,
          isLoading: false,
          fetchedAt: new Date(),
          errorPayload: null,
          byInstid: ImmutableMap(action.payload.results.map(
            institution => [institution.instid, institution]
          )),
        },
      };

    case INSTITUTIONS_LIST_FAILURE:
      return {
        ...state,
        institutions: {
          ...state.institutions,
          isLoading: false,
          errorPayload: action.payload,
        },
      };

    default:
      return state;
  }
};
