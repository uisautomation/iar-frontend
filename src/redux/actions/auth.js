/**
 * Redux actions for authenticating and authorising current user.
 *
 * These are relatively thin wrappers around redux-implicit-oauth2's actions. They're put here to
 * decouple the login/logout logic from having to know the mechanism by which login and logout are
 * achieved.
 */
import { login as implicitLogin, logout as implicitLogout } from 'redux-implicit-oauth2';

/**
 * OAuth2 credentials configuration for the IAR frontend application.
 */
const config = {
  url: process.env.REACT_APP_OAUTH_ENDPOINT,
  client: process.env.REACT_APP_OAUTH_CLIENT,
  redirect: window.location.origin + '/oauth2-callback',  // HACK: get the base URL of the website
  scope: process.env.REACT_APP_OAUTH_SCOPES,
  width: 500, // Width (in pixels) of login popup window. Optional, default: 400
  height: 400 // Height (in pixels) of login popup window. Optional, default: 400
};

/**
 * Initialise login to application.
 */
export const login = () => implicitLogin(config);

/**
 * Log out from the application.
 */
export const logout = implicitLogout;
