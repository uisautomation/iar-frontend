import Cache from '../cache';
import reducer, { initialState } from './lookupApi';
import { PEOPLE_GET_SUCCESS, PEOPLE_LIST_SUCCESS } from '../actions/lookupApi';

test('the initial state is correctly defined', () => {
  const nextState = reducer(undefined, {});

  expect(nextState.peopleByCrsid instanceof Map).toBe(true);
  expect(nextState.matchingPeopleByQuery instanceof Cache).toBe(true);
});

test('a people list result is cached', () => {

  const results = [
    {
      url: "http://localhost:8080/people/crsid/msb999",
      cancelled: false,
      identifier: {scheme: "crsid", value: "msb999"},
      visibleName: "M. Bamford"
    }
  ];

  const action = {
    type: PEOPLE_LIST_SUCCESS,
    meta: {query: 'msb9'},
    payload: {results: results, count: 1, offset: 0, limit: 10}
  };

  const nextState = reducer(initialState, action);

  expect(Object.is(initialState.matchingPeopleByQuery, nextState.matchingPeopleByQuery)).toBe(false);
  expect(nextState.matchingPeopleByQuery.get('msb9')).toBe(results);
});

test('the people list cache is pruned', () => {

  const results = [
    {
      url: "http://localhost:8080/people/crsid/msb999",
      cancelled: false,
      identifier: {scheme: "crsid", value: "msb999"},
      visibleName: "M. Bamford"
    }
  ];

  const action = {
    type: PEOPLE_LIST_SUCCESS,
    payload: {results: results, count: 1, offset: 0, limit: 10}
  };

  let nextState = initialState;
  for (let i = 0; i < 30; i++) {
      nextState = reducer(nextState, {...action, meta: {query: 'msb' + i}});
  }

  expect(nextState.matchingPeopleByQuery.size).toBe(20);
  expect(nextState.matchingPeopleByQuery.get('msb0')).not.toBeDefined();
  expect(nextState.matchingPeopleByQuery.get('msb10')).toBeDefined();
});

test('', () => {

  const payload = {
    url: "http://localhost:8080/people/crsid/msb999",
    cancelled: false,
    identifier: {scheme: "crsid", value: "msb999"},
    visibleName: "M. Bamford",
    isStaff: true,
    isStudent: false
  };

  const nextState = reducer(initialState, {type: PEOPLE_GET_SUCCESS, payload: payload});

  expect(Object.is(initialState.peopleByCrsid, nextState.peopleByCrsid)).toBe(false);
  expect(nextState.peopleByCrsid.get('msb999')).toBe(payload);
});
