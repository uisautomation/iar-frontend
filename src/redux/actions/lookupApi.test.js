import { RSAA } from 'redux-api-middleware';
import { ENDPOINT_PEOPLE } from '../../config';
import { listPeople } from "./lookupApi";
import { splitUrl } from "../../testutils";

// call listPeople() with the passed arguments, calls splitUrl, checks the baseUrl is the people
// endpoint and returns the queryItems from splitUrl()
const listPeopleAndParse = (...args) => {
  const { [RSAA]: { endpoint = '' } } = listPeople(...args);
  const { baseUrl, queryItems } = splitUrl(endpoint);
  expect(baseUrl).toBe(ENDPOINT_PEOPLE);
  return queryItems;
};

test('the query string is URL encoded', () => {
  const queryItems = listPeopleAndParse('mike b');
  expect(queryItems).toHaveLength(2);
  expect(queryItems).toContain('query=mike%20b');
  expect(queryItems).toContain('limit=10');
});

test('the limit can be set', () => {
  const queryItems = listPeopleAndParse('mike b', 20);
  expect(queryItems).toContain('limit=20');
});

test('the limit must be a number > 0', () => {
  expect(() => listPeopleAndParse('mike b', '!')).toThrowError('the limit must be > 0');
  expect(() => listPeopleAndParse('mike b', -1)).toThrowError('the limit must be > 0');
});
