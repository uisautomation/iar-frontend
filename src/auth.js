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
    // if non-null, a function which clears up the resources created by the login
    let cleanUp = null;

    // Register an event listener which listens for the next message event and then unregisters
    // itself.
    const messageEventListener = event => {
      if(!event || !event.data || event.data.type !== 'oauth2Callback') { return; }

      // state has to be in the location hash for this to be meant for us
      const uri = event.data.location;
      if(!uri || !uri.hash || (uri.hash.indexOf(state) === -1)) { return; }

      window.removeEventListener('message', messageEventListener);

      // Clean up any UI elements
      cleanUp();

      // Parse the redirect URL content and resolve or reject the promise as appropriate.
      auth.token.getToken(uri).then(resolve).catch(reject);
    };
    window.addEventListener('message', messageEventListener);

    if(prompt) {
      const newWindow = openPopup(
        auth.token.getUri(), 'iar-sign-in', config.oauth2PopupWidth, config.oauth2PopupHeight
      );
      cleanUp = () => { newWindow.close(); }
    } else {
      const newFrame = openIFrame(auth.token.getUri());
      cleanUp = () => { newFrame.remove(); }
    }
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
 * Open a hidden iframe pointing to the passed URL. Return the new iframe DOM element.
 */
const openIFrame = url => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', url)
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  return iframe;
};

/**
 * Open a popup window on the passed URL with a given name, width and height.
 *
 * Returns the new window object.
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

  return window.open(url, name, `${SETTINGS},${getPopupDimensions(width, height)}`);
};
