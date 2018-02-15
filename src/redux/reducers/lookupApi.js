import {
  PEOPLE_GET_SELF_FAILURE,
  PEOPLE_GET_SELF_REQUEST, PEOPLE_GET_SELF_RESET, PEOPLE_GET_SELF_SUCCESS,
  PEOPLE_GET_SUCCESS,
  PEOPLE_LIST_SUCCESS,
} from '../actions/lookupApi';

import Cache from '../cache';
import { Map } from 'immutable';

/**
 * State managed by the lookup API reducers.
 */
export const initialState = {
  // a map of people records retrieved from the lookup api - keyed on crsid
  peopleByCrsid: Map(),
  // a cache of arrays of people records returned by the lookup api search endpoint -
  // keyed on the search text that produced the result.
  matchingPeopleByQuery: new Cache({maxSize: 20}),
  // the authenticated user's profile
  self: null,
  // whether or not the authenticated user's profile is being loaded
  selfLoading: false,
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
      return { ...state, selfLoading: true };

    case PEOPLE_GET_SELF_RESET:
    case PEOPLE_GET_SELF_FAILURE:
      // reset self in case of reset and failure.
      return { ...state, self: null, selfLoading: false };

    case PEOPLE_GET_SELF_SUCCESS:
      // Add the person to the peopleByCrsid map
      return { ...state, self: action.payload, selfLoading: false};

    default:
      return state;
  }
};
