// Template runtime configuration for the application which override the defaults in src/config.js.
// This file is not transpiled and so must use a version of JavaScript understood by all target
// browsers.
//
// We user Object.assign() here so that we *update* the reactAppConfiguration variable, rather than
// *replace* it. This allows JavaScript before us to provide additional/default values.
window.reactAppConfiguration = Object.assign(
  {},
  window.reactAppConfiguration ? window.reactAppConfiguration : {},
  {
    // Put local configuration here.
  }
);
