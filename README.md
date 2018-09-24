# iar-frontend
[![Build Status](https://travis-ci.org/uisautomation/iar-frontend.svg?branch=master)](https://travis-ci.org/uisautomation/iar-frontend)
[<img src="https://marker.io/vendor/img/logo/browserstack-logo.svg" height="20">](https://www.browserstack.com/)

Frontend for IAR web application. Bootstrapped with Create React App.

## Install dependencies

`npm install`

## Run a development instance

To run locally, firstly start a local copy of the IAR backend, OAuth2 endpoint
and lookupproxy:

`docker-compose up`

Then create the "testclient" OAuth2 client:

`./scripts/create-client.sh`

Then start the local development server:

`npm start`

**NOTE:** The "testclient" client can also be used to log into the asset register
developer UI at http://localhost:8000/ui and also to log into the lookup proxy
developer UI at http://localhost:8080/ui.

## Build for production

`npm run build`

## Run the tests

`npm test`

## Serve some documentation on the components

`npm run styleguide`

## App configuration

*Build time* configuration is in the [.env](.env) file.
This can be overridden locally by placing values in a `.env.local` file.
Note that you must re-run `npm start` for build time configuration to take
effect. Also note all vars names **must** be frefixed with `REACT_APP_`.  See
the
[documentation](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-development-environment-variables-in-env)
for more information.

*Run time* configuration is specified by setting the
``window.reactAppConfiguration`` variable. The recommended way to do this is
outlined in the [.env](.env):

1. Add the ``REACT_APP_INDEX_HTML_HEAD`` build-time configuration value to
   ``.env.local`` so that ``<script src="/config.local.js">`` is inserted into
   the [index.html](public/index.html) file.
2. Copy the [configuration template](templates/config.in.js) to
   ``public/config.local.js``.
3. Add any local configuration to ``public/config.local.js``.

Although you need to re-run ``npm start`` after changing
``REACT_APP_INDEX_HTML_HEAD``, changes to run-time configuration will
take effect on the next reload. Both ``.env.local`` and
``public/config.local.js`` are added to [.gitignore](.gitignore) so that they
are not inadvertently checked into source control.

**NOTE:** In the test suite, configuration is loaded from [a special
module](src/test/config.js) since index.html is not parsed when running tests.
