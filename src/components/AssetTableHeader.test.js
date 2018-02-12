import React from 'react';
import { render, createMockStore, DEFAULT_INITIAL_STATE } from '../testutils';
import Table, { TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import { Direction } from '../redux/actions/assetRegisterApi';
import { SortCell, getNextQuery } from './AssetTableHeader';

const wrap = sortCell => (
  <Table><TableHead><TableRow>{ sortCell }</TableRow></TableHead></Table>
);

// Return initialise store with query replaced
const storeWithQuery = query => {
  query = { ...DEFAULT_INITIAL_STATE.assets.query, ...query };
  const assets = { ...DEFAULT_INITIAL_STATE.assets, query };
  const state = { ...DEFAULT_INITIAL_STATE, assets };
  return createMockStore(state);
};

test('getNextQuery sorts descending if already sorting by field ascending', () => {
  const prevQuery = { sort: { field: 'xx', direction: Direction.ascending } };
  const nextQuery = getNextQuery(prevQuery, 'xx');
  expect(nextQuery.sort.field).toBe('xx');
  expect(nextQuery.sort.direction).toBe(Direction.descending);
});

test('getNextQuery sorts ascending if already sorting by field descending', () => {
  const prevQuery = { sort: { field: 'xx', direction: Direction.descending } };
  const nextQuery = getNextQuery(prevQuery, 'xx');
  expect(nextQuery.sort.field).toBe('xx');
  expect(nextQuery.sort.direction).toBe(Direction.ascending);
});

test('getNextQuery sorts ascending if not already sorting by field', () => {
  const prevQuery = { sort: { field: 'xx', direction: Direction.descending } };
  const nextQuery = getNextQuery(prevQuery, 'yy');
  expect(nextQuery.sort.field).toBe('yy');
  expect(nextQuery.sort.direction).toBe(Direction.ascending);
});

test('sort cell renders with initial state', () => {
  const sortCell = render(wrap(<SortCell field='xx' label='yy' />)).findByType(SortCell);
});

test('sort cell renders inactive if not filtering by field', () => {
  const store = storeWithQuery({ sort: { field: 'xx', direction: Direction.ascending } });
  const sortCell = render(wrap(<SortCell field='zz' label='yy' />), { store }).findByType(SortCell);
  expect(sortCell.findByType(TableSortLabel).props.active).toBe(false);
});

test('sort cell renders active if filtering by field', () => {
  const store = storeWithQuery({ sort: { field: 'xx', direction: Direction.ascending } });
  const sortCell = render(wrap(<SortCell field='xx' label='yy' />), { store }).findByType(SortCell);
  expect(sortCell.findByType(TableSortLabel).props.active).toBe(true);
});

test('sort cell renders ascending sort direction', () => {
  const store = storeWithQuery({ sort: { field: 'xx', direction: Direction.ascending } });
  const sortCell = render(wrap(<SortCell field='xx' label='yy' />), { store }).findByType(SortCell);
  expect(sortCell.findByType(TableSortLabel).props.direction).toBe('asc');
});

test('sort cell renders descending sort direction', () => {
  const store = storeWithQuery({ sort: { field: 'xx', direction: Direction.descending } });
  const sortCell = render(wrap(<SortCell field='xx' label='yy' />), { store }).findByType(SortCell);
  expect(sortCell.findByType(TableSortLabel).props.direction).toBe('desc');
});
