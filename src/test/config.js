/**
 * Module providing mock configuration for the test suite. Exports an object for the test suite
 * which stands in for the reactAppConfiguration object provided by config.js. Default calues for
 * configuration settings are still used if not overridden here.
 */

const config = {
    // API endpoints
    assetRegisterEndpoint: 'http://assetregister.invalid/',
    lookupEndpoint: 'http://lookup.invalid/',
    oauth2AuthEndpoint: 'http://oauth2.invalid/auth',

    // OAuth2 client configuration
    oauth2ClientId: 'test-suite-client',
};

export default config;
