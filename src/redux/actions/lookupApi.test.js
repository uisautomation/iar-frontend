import { RSAA } from 'redux-api-middleware';
import { listPeople, ENDPOINT_PEOPLE } from "./lookupApi";
import splitUrl from "../../test/splitUrl";

// call listPeople() with the passed arguments, calls splitUrl, checks the baseUrl is the people
// endpoint and returns the queryItems from splitUrl()
const listPeopleAndParse = (...args) => {
  const { [RSAA]: { endpoint = '' } } = listPeople(...args);
  const { baseUrl, queryItems } = splitUrl(endpoint);
  expect(baseUrl).toBe(ENDPOINT_PEOPLE);
  return queryItems;
};

// test that the query string is URL encoded and a default limit is applied
test('the query string is URL encoded', () => {
  const queryItems = listPeopleAndParse('mike b');
  expect(queryItems).toHaveLength(2);
  expect(queryItems).toContain('query=mike%20b');
  expect(queryItems).toContain('limit=10');
});

// test that the limit can be set as a parameter
test('the limit can be set', () => {
  const queryItems = listPeopleAndParse('mike b', 20);
  expect(queryItems).toContain('limit=20');
});

// test that the limit parameter must be a positive number
test('the limit must be a number > 0', () => {
  expect(() => listPeopleAndParse('mike b', '!')).toThrowError('the limit must be > 0');
  expect(() => listPeopleAndParse('mike b', -1)).toThrowError('the limit must be > 0');
});
