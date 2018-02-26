/**
 * Redux actions for authenticating and authorising current user.
 *
 * These are relatively thin wrappers around redux-implicit-oauth2's actions. They're put here to
 * decouple the login/logout logic from having to know the mechanism by which login and logout are
 * achieved.
 */
import { login as implicitLogin, logout as implicitLogout } from 'redux-implicit-oauth2';

// construct the OAuth2 redirect URL if not specified.
const basename = process.env.REACT_APP_BASENAME || '/';
const redirect =
  process.env.REACT_APP_OAUTH_REDIRECT || window.location.origin + basename + 'oauth2-callback';

/**
 * OAuth2 credentials configuration for the IAR frontend application.
 */
const config = {
  url: process.env.REACT_APP_OAUTH_ENDPOINT,
  client: process.env.REACT_APP_OAUTH_CLIENT,
  redirect: redirect,
  scope: process.env.REACT_APP_OAUTH_SCOPES,
  width: 640, // Width (in pixels) of login popup window.
  height: 512 // Height (in pixels) of login popup window.
};

/**
 * Initialise login to application.
 */
export const login = () => implicitLogin(config);

/**
 * Log out from the application.
 */
export const logout = implicitLogout;
