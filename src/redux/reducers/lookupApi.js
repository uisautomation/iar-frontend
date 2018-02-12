import {
  PEOPLE_GET_SUCCESS,
  PEOPLE_LIST_SUCCESS,
} from '../actions/lookupApi';

/**
 * State managed by the lookup API reducers.
 */
export const initialState = {
  // a map of people records retrieved from the lookup api - keyed on crsid
  peopleByCrsid: new Map(),

  // a map of arrays of people records returned by the lookup api search endpoint -
  // keyed on the search text that produced the result.
  matchingPeopleByQuery: new Map()
};

export default (state = initialState, action) => {
  switch(action.type) {

    case PEOPLE_LIST_SUCCESS:
      const { query } = action.meta;
      const matchingPeopleByQuery = new Map([
        ...state.matchingPeopleByQuery,
        [query, action.payload.results]
      ]);
      // TODO some simple cache clearing should be done here.
      return { ...state, matchingPeopleByQuery };

    case PEOPLE_GET_SUCCESS:
      // Add the person to the peopleByCrsid map
      const person = action.payload;
      const peopleByCrsid = new Map([
        ...state.peopleByCrsid,
        [person.identifier.value, person]
      ]);
      return { ...state, peopleByCrsid };

    default:
      return state;
  }
};
