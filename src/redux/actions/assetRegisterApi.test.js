import { RSAA } from 'redux-api-middleware';
import { getAssets, Direction } from './assetRegisterApi';
import splitUrl from "../../test/splitUrl";

// call getAssets() with the passed arguments, calls splitUrl, checks the baseUrl is the assets
// endpoint and returns the queryItems from splitUrl()
const getAssetsAndParse = (...args) => {
  const { [RSAA]: { endpoint = '' } } = getAssets(...args);
  const { baseUrl, queryItems } = splitUrl(endpoint);
  expect(baseUrl).toBe(process.env.REACT_APP_ENDPOINT_ASSETS);
  return queryItems;
};

test('simple call to getAssets just returns assets endpoint', () => {
  const queryItems = getAssetsAndParse();
  expect(queryItems).toHaveLength(1);
  expect(queryItems).toContain('ordering=-created_at');
});

test('adding a search adds an appropriately encoded query parameter', () => {
  const queryItems = getAssetsAndParse({ search: 'one two' });
  expect(queryItems).toHaveLength(2);
  expect(queryItems).toContain('ordering=-created_at');
  expect(queryItems).toContain('search=one%20two');
});

test('can add sort field', () => {
  const queryItems = getAssetsAndParse({ sort: { field: 'name' } });
  expect(queryItems).toEqual(['ordering=-name']);
});

test('can add ascending sort field', () => {
  const queryItems = getAssetsAndParse({ sort: { field: 'name', direction: Direction.ascending } });
  expect(queryItems).toEqual(['ordering=name']);
});

test('can add descending sort field', () => {
  const queryItems = getAssetsAndParse({ sort: { field: 'name', direction: Direction.descending } });
  expect(queryItems).toEqual(['ordering=-name']);
});

test('invalid directions are ignored', () => {
  const queryItems = getAssetsAndParse({ sort: { field: 'name', direction: 'RANDOM' } });
  expect(queryItems).toEqual(['ordering=-name']);
});

test('Can filter by multiple fields with invalid ones being ignored', () => {
  const queryItems = getAssetsAndParse({
    filter: { name: 'xxx', department: 'yyy', badField: 'zzz', ordering: 'aaa', search: 'bbb' }
  });
  expect(queryItems).toHaveLength(3);
  expect(queryItems).toContain('ordering=-created_at');
  expect(queryItems).toContain('department=yyy');
  expect(queryItems).toContain('name=xxx');
});

test('sort, search and filter can be combined together', () => {
  const queryItems = getAssetsAndParse({
    sort: { field: 'name', direction: Direction.descending }, search: 'one two',
    filter: { name: 'a b c', department: 'd e f', no_such_field: 'zzz' }
  });
  expect(queryItems).toHaveLength(4);
  expect(queryItems).toContain('search=one%20two');
  expect(queryItems).toContain('ordering=-name');
  expect(queryItems).toContain('department=d%20e%20f');
  expect(queryItems).toContain('name=a%20b%20c');
});
