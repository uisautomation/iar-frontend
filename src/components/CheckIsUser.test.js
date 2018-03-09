import React from 'react';
import history from '../history'
import CheckIsUser, {NOT_A_USER_PATH} from "./CheckIsUser";
import { populatedState } from '../test/fixtures';
import {createMockStore, render} from "../testutils";

const STATE_WITH_NO_SELF_GROUPS = {
  ...populatedState,
  lookupApi: {
    ...populatedState.lookupApi,
    self: {
      ...populatedState.lookupApi.self,
      groups: []
    }
  }
};

describe('CheckIsUser', () => {

  let history_push;

  beforeEach(() => {
    history_push = history.push;
    history.push = jest.fn();
  });

  // check that component redirects to the "not a user" page if the user is not in correct group
  test('should redirect to "not a user" if user is not in correct group', () => {
    render(<CheckIsUser />, {store: createMockStore(STATE_WITH_NO_SELF_GROUPS)});
    expect(history.push).toHaveBeenCalledWith(NOT_A_USER_PATH);
  });

  // check that no redirect happens if the user is in correct group
  test("doesn't redirect if the user is in correct group", () => {
    render(<CheckIsUser />, {store: createMockStore(populatedState)});
    expect(history.push).not.toHaveBeenCalled();
  });

  // check that no redirect happens if the user is not in correct group but the user is already on the "not a user" page
  test("doesn't redirect if the user is in correct group but the user is already on the 'not a user' page", () => {
    history_push(NOT_A_USER_PATH);
    render(<CheckIsUser />, {store: createMockStore(STATE_WITH_NO_SELF_GROUPS)});
    expect(history.push).not.toHaveBeenCalled();
  });

  afterEach(() => {
    history.push = history_push;
  });
});
