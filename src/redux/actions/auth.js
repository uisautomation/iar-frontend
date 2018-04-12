/**
 * Redux actions for authenticating and authorising current user.
 *
 */
import history from '../../history'
import { login as authLogin } from '../../auth';

// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

/**
 * Initialise login to application.
 *
 * Takes an optional options object as passed to auth.login(). Returns a thunk function which
 * returns a promise resolved with the result of dispatching a LOGIN_SUCCESS or LOGIN_FAILURE
 * action.
 *
 * Returns a function and requires the redux-thunk middleware.
 */
export const login = options => dispatch => {
  dispatch({ type: LOGIN_REQUEST });

  return authLogin(options)
    .then(token => dispatch({
      type: LOGIN_SUCCESS,
      payload: { token },
    }))
    .catch(error => dispatch({
      type: LOGIN_FAILURE,
      payload: { error },
    }));
}

/**
 * Log out from the application and redirect to "/".
 *
 * Returns a function and requires the redux-thunk middleware.
 */
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  history.push('/');
};
