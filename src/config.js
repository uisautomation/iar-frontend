/**
 * A module which exports the runtime configuration for the application.
 *
 * This should be set on the window object as reactAppConfiguration.
 */
import testConfig from './test/config';

// This is the *default* configuration. Settings in config.js override this.
const defaultConfig = {
  // Base URL of this web application.
  basename: '/',

  // OAuth2 scopes requested for our access token.
  oauth2Scopes: 'assetregister lookup:anonymous',

  // OAuth2 client configuration.
  oauth2ClientId: 'testclient',

  // The default for the optional oauth2RedirectUrl configuration value is computed below since
  // it depends on the final value of basename.

  // Size of popup window used for OAuth2 implicit flow.
  oauth2PopupWidth: 640,
  oauth2PopupHeight: 512,

  // Lookup group used to gate access to the IAR.
  iarUsersLookupGroup: 'uis-iar-users',

  // API endpoints.
  assetRegisterEndpoint: 'http://localhost:8000/',
  lookupEndpoint: 'http://localhost:8080/',
  oauth2AuthEndpoint: 'http://localhost:4444/oauth2/auth',
};

// When running in the test suite, we actually want to make use of the test configuration.
const config = {
  ...defaultConfig,
  ...(process.env.NODE_ENV === 'test') ? testConfig : window.reactAppConfiguration,
};

// If it hasn't previously been set, set the rdirect URL for OAuth2 implicit flow. We set it here
// because "basename" may have been overridden by the reactAppConfiguration object.
if(!config.oauth2RedirectUrl) {
  config.oauth2RedirectUrl = window.location.origin + config.basename + 'oauth2-callback.html';
}

export default config;
