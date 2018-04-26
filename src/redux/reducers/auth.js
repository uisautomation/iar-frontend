import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/auth';

export const AUTH_TOKEN_STORAGE_KEY = 'cachedOAuth2TokenData';

// Update initial state based upon any token saved in the localStorage
export const retrieveStoredToken = state => {
  // no localStorage support in browser?
  if(!window.localStorage) { return state; }

  // is there any stored data?
  const storedTokenJSON = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  if(!storedTokenJSON) { return state; }

  // attempt to parse it as JSON
  let storedToken;
  try {
    storedToken = JSON.parse(storedTokenJSON);
  } catch(err) {
    // we silently swallow the error here to avoid polluting the console but we could report it
    // via, for example:
    // console.error(err);
    return state;
  }

  // extract token data
  const { token, expiresAt } = storedToken;

  // is the token still alive?
  if(!token || !expiresAt || expiresAt < (new Date()).getTime()) { return state; }

  // everything checks out, retrieve it
  return { ...state, isLoggedIn: true, token, expiresAt };
};

// Save access token to localStorage
const saveStoredToken = (token, expiresAt) => {
  // no localStorage support in browser?
  if(!window.localStorage) { return; }
  window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, JSON.stringify({ token, expiresAt }));
};

// Remove any access token cached in local storage.
const clearStoredToken = () => {
  // no localStorage support in browser?
  if(!window.localStorage) { return; }
  window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
}

// The initial state is passed through retrieveStoredToken which sets the token, expiresAt and
// isLoggedIn fields if there is a valid token saved in the browser's local storage.
export const initialState = retrieveStoredToken({
  // Current access token for user or null if there is not one.
  token: null,

  // If non-null, the last login error.
  error: null,

  // If true, the user is currently logging in.
  isLoggingIn: false,

  // If true, the user is currently logged in.
  isLoggedIn: false,

  // A timestamp (as returned by Date.getTime()) indicating when the token expires.
  expiresAt: null,
});

export default (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_REQUEST:
      return {...state, isLoggingIn: true };
    case LOGIN_SUCCESS:
      {
        // extract the authorisation token from the action's payload
        const { token: tokenObject } = action.payload;
        const token = tokenObject.accessToken, expiresAt = tokenObject.expires.getTime();

        // cache the token in the browser's localStorage
        saveStoredToken(token, expiresAt);

        return { ...state, isLoggingIn: false, isLoggedIn: true, token, expiresAt };
      }
    case LOGIN_FAILURE:
      return {...state, isLoggingIn: false, isLoggedIn: false, token: null, expiresAt: null};
    case LOGOUT:
      // clear any cached token from localStorage
      clearStoredToken();
      return {...state, isLoggedIn: false, token: null, expiresAt: null};
    default:
      return state;
  }
}
