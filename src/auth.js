/**
 * A basic OAuth2 implicit login client which supports interactive and non-interactive
 * authorisation flows.
 */
import config from './config';
import ClientOAuth2 from 'client-oauth2';

/**
 * OAuth2 credentials configuration for the IAR frontend application.
 */
const oauth2Config = {
  clientId: config.oauth2ClientId,
  authorizationUri: config.oauth2AuthEndpoint,
  redirectUri: config.oauth2RedirectUrl,
  scopes: config.oauth2Scopes,
};

/**
 * Perform a login. Optionally takes a single options object with the following fields:
 *
 * prompt: Boolean, default true. Should the user be prompted if not logged in?
 *
 * If prompt is false, login is performed via a hidden IFrame. If prompt is true, a popup is used
 * and so this should only be called as a result of a user action such as clicking a button.
 *
 * Returns a promise which is resolved on login or rejected with an error otherwise.
 */
export const login = ({ prompt=true } = {}) => {
  const state = generateState();

  // Create a new client-oauth2 client object with OAuth2 configuration from the global config.
  const auth = new ClientOAuth2({
    ...oauth2Config,
    scopes: oauth2Config.scopes + (prompt ? '': ' prompt:none'),
    state: state,
  });

  return new Promise((resolve, reject) => {
    // We have a two pronged attack here to listen for a response from the OAuth2 endpoint. We both
    // listen for a message posted from oauth2-callback.html and poll the popup/iframe for its
    // location. We have to do this two pronged attack because IE11, empirically, seems reluctant
    // to allow postMessage to the same origin after all the OAuth2 redirects.

    // if non-null, the current timeout being used to listen for a new location
    let locationPollTimeout = null;

    // We create a postMessage listener, messageEventListener, which listens for a location object
    // posted by oauth2-callback.html. At the same time, we launch a timer to directly examine the
    // location of the window/iframe. When either of these has a Location-like object we can
    // examine to get the credentials, they pass it to the following function which clears up all
    // the resources and resolves/rejects this Promise as appropriate.
    //
    // This function returns false if the location was not processed.
    const handleLocation = location => {
      // The state has to be in the location hash for this to be meant for us.
      if(!location || !location.hash || (location.hash.indexOf(state) === -1)) { return false; }

      // Clear up any polling timeout, un-register the poll timeout and close/remove the
      // window/IFrame.
      if(locationPollTimeout !== null) {
        window.clearTimeout(locationPollTimeout);
        locationPollTimeout = null;
      }
      window.removeEventListener('message', messageEventListener);
      authContainer.dispose();

      // Parse the redirect URL content and resolve or reject the promise as appropriate.
      auth.token.getToken(location).then(resolve).catch(reject);

      // Signal that the location object was processed.
      return true;
    }

    // Register an event listener which listens for the next message event.
    const messageEventListener = event => {
      if(!event || !event.data || event.data.type !== 'oauth2Callback') { return; }
      handleLocation(event.data.location);
    };
    window.addEventListener('message', messageEventListener);

    // Open an IFrame or window to perform the authorisation flow. We open an IFrame if we're
    // requesting a promptless login and a window otherwise.
    const authContainer = prompt ?
      openPopup(
        auth.token.getUri(), 'iar-sign-in', config.oauth2PopupWidth, config.oauth2PopupHeight
      ) :
      openIFrame(auth.token.getUri());

    // Register a timer to poll the opened window/IFrame for its location.
    const locationPollCallback = () => {
      let containerLocation;
      try {
        // Extract the hash, host, search and path from the location. We extract them explicitly
        // here so that cross-origin permission denied errors can be caught and handled. The
        // various values are then re-constituted so they may be passed to handleLocation().
        const { hash, host, search, path } = authContainer.getLocation();
        containerLocation = { hash, host, search, path };
      } catch(err) {
        // Silently swallow errors retrieving the parameters in production. In development, it's
        // useful to see them.
        if (process.env.NODE_ENV !== 'production') {
          console.warn(err);
        }
      }

      // Try to process the location.
      if(handleLocation(containerLocation)) { return; }

      // Set a timeout to call ourselves again. This happens 1) if the try/catch above caught an
      // error of 2) if handleLocation() returned a falsy value.
      locationPollTimeout = window.setTimeout(locationPollCallback, 500);
    };
    locationPollCallback();
  });
};

// Utility functions

/**
 * Generate a random state (aka "nonce") used as part of the OAuth2 implicit flow.
 */
const generateState = function(length = 32) {
  let text = '', possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for(let i=0; i<length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/**
 * Open a hidden iframe pointing to the passed URL. Returns an object with the following content:
 *
 *  {
 *    element: the new iframe DOM element
 *    dispose: a function which will remove the created IFrame from the DOM
 *    getLocation: a function which returns a Location object for the opened IFrame
 *  }
 *
 * This object is intentionally similar to that returned by openPopup() so that common properties
 * it may be used interchangeably.
 */
const openIFrame = url => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', url)
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  return {
    element: iframe,
    dispose: () => iframe.remove(),
    getLocation: () => iframe.contentWindow.location,
  };
};

/**
 * Open a popup window on the passed URL with a given name, width and height. Returns an object
 * with the following content:
 *
 *  {
 *    window: the new window object
 *    dispose: a function which will close the opened window
 *    getLocation: a function which returns the opened window's Location object
 *  }
 *
 * This object is intentionally similar to that returned by openIFrame() so that common properties
 * may be used interchangeably.
 */
const openPopup = (url, name, width, height) => {
  const SETTINGS =
      'scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no'

  const getPopupDimensions = (width, height) => {
      const wLeft = window.screenLeft || window.screenX
      const wTop = window.screenTop || window.screenY

      const left = wLeft + window.innerWidth / 2 - width / 2
      const top = wTop + window.innerHeight / 2 - height / 2

      return `width=${width},height=${height},top=${top},left=${left}`
  }

  const win = window.open(url, name, `${SETTINGS},${getPopupDimensions(width, height)}`);

  return {
    window: win,
    dispose: () => win.close(),
    getLocation: () => win.location,
  };
};
