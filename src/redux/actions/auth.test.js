jest.mock('../../auth');

import { login, LOGIN_SUCCESS, LOGIN_FAILURE } from './auth';
import { login as authLogin } from '../../auth';

describe('login', () => {
  let dispatch;

  beforeEach(() => {
    authLogin.mockReset();
    authLogin.mockImplementation(() => Promise.resolve('some-token'));
    dispatch = jest.fn(action => action);
  });

  test('passes options to auth.login', () => {
    const options = { prompt: true };
    login(options)(dispatch);
    expect(authLogin).toHaveBeenCalledTimes(1);
    expect(authLogin).toHaveBeenCalledWith(options);
  });

  test('returns promise resolved with LOGIN_SUCCESS action if login succeeds', () => {
    const options = { prompt: true }, token = 'new-token';
    authLogin.mockImplementation(() => Promise.resolve(token));
    const authPromise = login(options)(dispatch);
    expect(authPromise).toBeInstanceOf(Promise);
    expect(login(options)(dispatch)).resolves.toMatchObject({
      type: LOGIN_SUCCESS, payload: { token }
    });
  });

  test('returns promise resolved with LOGIN_FAILURE action if login succeeds', () => {
    const options = { prompt: true }, error = 'do-not-like-you';
    authLogin.mockImplementation(() => Promise.reject(error));
    const authPromise = login(options)(dispatch);
    expect(authPromise).toBeInstanceOf(Promise);
    expect(login(options)(dispatch)).resolves.toMatchObject({
      type: LOGIN_FAILURE, payload: { error }
    });
  });
});
