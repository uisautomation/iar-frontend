// mock window.localStorage
import '../../test/mock-localstorage';

import reducer, { AUTH_TOKEN_STORAGE_KEY, retrieveStoredToken } from './auth';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/auth';

describe('LOGIN_REQUEST', () => {
  test('sets isLoggingIn', () => {
    const state = reducer(undefined, { type: LOGIN_REQUEST });
    expect(state.isLoggingIn).toBe(true);
  });
});

describe('LOGIN_SUCCESS', () => {
  let action, state;

  beforeEach(() => {
    // make sure local storage is clear
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);

    action = {
      type: LOGIN_SUCCESS, payload: { token: { accessToken: 'xxx', expires: new Date() } }
    };

    state = reducer(undefined, action);
  });

  test('sets isLoggedIn', () => {
    expect(state.isLoggedIn).toBe(true);
  });

  test('sets token', () => {
    expect(state.token).toBe(action.payload.token.accessToken);
  });

  test('sets expiresAt', () => {
    expect(state.expiresAt).toBe(action.payload.token.expires.getTime());
  });

  test('clears isLoggingIn', () => {
    expect(state.isLoggingIn).toBe(false);
  });

  test('stores state', () => {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, JSON.stringify({
      token: action.payload.token.accessToken, expiresAt: action.payload.token.expires.getTime()
    }));

    // now initial state should find the token cached
    const newInitialState = retrieveStoredToken(reducer(undefined, { }));
    expect(newInitialState).toMatchObject({
      token: action.payload.token.accessToken,
      expiresAt: action.payload.token.expires.getTime(),
    });
  });
});

describe('LOGIN_FAILURE', () => {
  let action, state;

  beforeEach(() => {
    action = {
      type: LOGIN_FAILURE, payload: { error: 'xxx' }
    };
    state = reducer(undefined, action);
  });

  test('clears isLoggingIn', () => {
    expect(state.isLoggingIn).toBe(false);
  });

  test('clears isLoggedIn', () => {
    expect(state.isLoggedIn).toBe(false);
  });

  test('clears token', () => {
    expect(state.token).toBe(null);
  });

  test('clears expiresAt', () => {
    expect(state.expiresAt).toBe(null);
  });
});

describe('LOGOUT', () => {
  let action, state;

  beforeEach(() => {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'xxx');
    action = { type: LOGOUT };
    state = reducer(undefined, action);
  });

  test('clears isLoggedIn', () => {
    expect(state.isLoggedIn).toBe(false);
  });

  test('clears token', () => {
    expect(state.token).toBe(null);
  });

  test('clears expiresAt', () => {
    expect(state.expiresAt).toBe(null);
  });

  test('clears stored token', () => {
  });
});

describe('retrieveStoredToken', () => {
  test('returns its input if stored state invalid', () => {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'not-some-json');
    const initialState = reducer(undefined, {});
    expect(retrieveStoredToken(initialState)).toBe(initialState);
  });
});
