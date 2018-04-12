/**
 * Import this module to mock the global window.localStorage object.
 *
 * The implicit OAuth2 implmentation examines localStorage when first run to determine if there is
 * any OAuth2 token defined for the app.
 */
import localStorage from 'mock-local-storage';

global.window = global.window || {};
window.localStorage = global.localStorage;
