import {
  PEOPLE_GET_SUCCESS,
  SEARCH_GET_SUCCESS,
} from '../actions/lookupApi';

/**
 * State managed by the lookup API reducers.
 */
export const initialState = {
  // FIXME
  peopleByCrsid: new Map(),

  // FIXME
  matchingPeopleByQuery: new Map()
};

export default (state = initialState, action) => {
  switch(action.type) {

    case PEOPLE_GET_SUCCESS:
      // Add the person to the peopleByCrsid map
      const person = action.payload;
      const peopleByCrsid = new Map([
        ...state.peopleByCrsid,
        [person.identifier.value, person]
      ]);
      return { ...state, peopleByCrsid };

    case SEARCH_GET_SUCCESS:
      const { query } = action.meta;
      const matchingPeopleByQuery = new Map([
        ...state.matchingPeopleByQuery,
        [query, action.payload.results]
      ]);
      // FIXME implement cache
      return { ...state, matchingPeopleByQuery };

    default:
      return state;
  }
};
