// mock the lookupApi actions module
jest.mock('../redux/actions/lookupApi', () => {
  const original = require.requireActual('../redux/actions/lookupApi');
  return {
    ...original,
    listInstitutions: jest.fn(() => ({ type: 'mock-list-institutions-action' })),
  };
});

import React from 'react';
import { Map } from 'immutable';
import FetchLookupInstitutions from './FetchLookupInstitutions';
import { listInstitutions } from '../redux/actions/lookupApi';
import { render, createMockStore, DEFAULT_INITIAL_STATE as initialState } from '../testutils';

// A state with institutions populated and logged in.
const MOCK_STATE = {
  ...initialState,
  auth: { ...initialState.auth, isLoggedIn: true },
  lookupApi: {
    ...initialState.lookupApi,
    institutions: {
      ...initialState.lookupApi.institutions,

      fetchedAt: new Date(),

      byInstid: Map([
        ['AAA', { instid: 'AAA', name: 'Dept of A' }],
        ['BBB', { instid: 'BBB', name: 'Dept of B' }],
      ]),
    },
  },
};

beforeEach(() => {
  listInstitutions.mockClear();
});

test('Does not fetch if not logged in', () => {
  const state = { ...initialState, auth: { ...initialState.auth, isLoggedIn: false } };
  const store = createMockStore(state);
  const testInstance = render(<FetchLookupInstitutions />, { store });
  expect(listInstitutions.mock.calls).toHaveLength(0);
});

test('Does not fetch if institutions already fetched', () => {
  const store = createMockStore(MOCK_STATE);
  const testInstance = render(<FetchLookupInstitutions />, { store });
  expect(listInstitutions.mock.calls).toHaveLength(0);
});

test('Does fetch if logged in but no institutions fetched yet', () => {
  const state = { ...initialState, auth: { ...initialState.auth, isLoggedIn: true } };
  const store = createMockStore(state);
  const testInstance = render(<FetchLookupInstitutions />, { store });
  expect(listInstitutions.mock.calls).toHaveLength(1);
});
