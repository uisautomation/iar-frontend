import React from 'react';
import {createMockStore, DEFAULT_INITIAL_STATE, render} from "../testutils";
import { FetchSelf } from ".";
import {PEOPLE_GET_SELF_REQUEST} from "../redux/actions/lookupApi";

// Check that the profile is retrieved if we are logged in.
test('The profile is retrieved if we are logged in', () => {
  const store = createMockStore(DEFAULT_INITIAL_STATE);
  const instance = render(<FetchSelf />, { store, url: '/' });
  expect(store.getActions()).toEqual([{type: PEOPLE_GET_SELF_REQUEST}]);
});

// Check that the profile isn't retrieved if we are mid fetch.
test("The profile isn't retrieved if we are mid fetch", () => {
  const store = createMockStore({
    ...DEFAULT_INITIAL_STATE,
    lookupApi: {...DEFAULT_INITIAL_STATE.lookupApi, selfLoading: true}
  });
  const instance = render(<FetchSelf />, { store, url: '/' });
  expect(store.getActions()).toEqual([]);
});

// Check that the profile isn't retrieved twice.
test("The profile isn't retrieved twice", () => {
  const store = createMockStore({
    ...DEFAULT_INITIAL_STATE,
    lookupApi: {...DEFAULT_INITIAL_STATE.lookupApi, self: {visibleName: "M. Bamford"}}
  });
  const instance = render(<FetchSelf />, { store, url: '/' });
  expect(store.getActions()).toEqual([]);
});
