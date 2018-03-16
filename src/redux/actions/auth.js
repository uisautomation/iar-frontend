/**
 * Redux actions for authenticating and authorising current user.
 *
 * These are relatively thin wrappers around redux-implicit-oauth2's actions. They're put here to
 * decouple the login/logout logic from having to know the mechanism by which login and logout are
 * achieved.
 */
import { login as implicitLogin, logout as implicitLogout } from 'redux-implicit-oauth2';
import history from '../../history'
import config from '../../config';

/**
 * OAuth2 credentials configuration for the IAR frontend application.
 */
const oauth2Config = {
  url: config.oauth2AuthEndpoint,
  client: config.oauth2ClientId,
  redirect: config.oauth2RedirectUrl,
  scope: config.oauth2Scopes,
  width: config.oauth2PopupWidth, // Width (in pixels) of login popup window.
  height: config.oauth2PopupHeight, // Height (in pixels) of login popup window.
};

/**
 * Initialise login to application.
 */
export const login = () => implicitLogin(oauth2Config);

/**
 * Log out from the application and redirect to "/".
 *
 * Returns a function and requires the redux-thunk middleware.
 */
export const logout = () => dispatch => {
  dispatch(implicitLogout());
  history.push('/');
};
