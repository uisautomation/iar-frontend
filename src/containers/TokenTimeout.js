import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, logout, LOGIN_FAILURE } from '../redux/actions/auth';
import { getSelf } from '../redux/actions/lookupApi';
import { snackbarOpen } from '../redux/actions/snackbar';

/**
 * Instead of setting the token timeout exactly to the expiry time of the token, leave a little bit
 * of "head room" so that we have a chance to act in good time before the token times out. This
 * value is the number of milliseconds *before* token expiry at which our token expiration timer
 * should fire.
 *
 * For testing purposes, this can be increased to near the total lifetime of the token. For
 * normal use, we set it to 2 minutes which should be plenty of time.
 */
const TIMEOUT_HEAD_ROOM = 120e3; // milliseconds

/**
 * A component which manages a timer to handle token timeout.
 *
 * Just before the token times out (see note on "head room" above), attempt a prompt-less login. If
 * this login fails, log the current user out.
 *
 * After a successful prompt-less login, we re-fetch the "self" resource and compare the identity
 * returned with the first identity that was received by the application. If the self resource is
 * for a different identity, we immediately log the user out. This is because we have no guarantee
 * that the user who was logged in to the consent app when we first got an authorisation token is
 * the same user that is logged in now. By comparing the self resource, we can check for ourselves
 * that the logged in user has not changed.
 *
 * An example test protocol to check token timeout behaviour in development would be as follows:
 *
 * 1. Edit TIMEOUT_HEAD_ROOM to be 280e3. In development the access token lifetime if 5 minutes and
 *    so this head room means that a new token should be fetched every 20 seconds.
 *
 * 2. To test token timeout behaviour, open http://localhost:8090/logout in another tab. This will
 *    sign the current user out of the consent app and hence block prompt-less login. On the next
 *    token refresh, the user should be logged out.
 *
 * 3. To test signing in as another user, open two IARs in two tabs: tab 1 and tab 2. Visit
 *    http://localhost:8090/logout in tab 3. And sign in to the IAR in tab 1 as user test0010.
 *    Switch to tab 3 and reload the logout URL. Then sign in to the IAR in tab 2. When IAR in tab
 *    1 attempts token refresh, it should get a token for user test0011 and cause a logout.
 */
class TokenTimeout extends Component {
  constructor(...args) {
    super(...args);

    // Value returned by setTimeout. If non-NULL, the corresponding timeout is still "in flight".
    this.timeoutID = null;

    // Cached auth token. If this changes, the self resource will be re-fetched to check that it
    // still corresponds to the original identity.
    this.authToken = null;

    // Cached expiry time for the token.
    this.expiresAt = null;

    // The first self resource we ever see. If the self resource ever changes identity from this,
    // log the user out.
    this.firstSelf = null;
  }

  componentDidMount() {
    const { auth, self } = this.props;

    // If this component is mounted after we already have an auth, we won't get a
    // componentWillReceiveProps call so handle the current auth, whatever it is.
    this.handleProps(auth, self);
  }

  componentWillUnmount() {
    // On unmount, clear any cached state and remove the timer if it is in flight

    if(this.timeoutID !== null) {
      window.clearTimeout(this.timeoutID);
      this.timeoutID = null;
    }
    this.authToken = this.expiresAt = this.firstSelf = null;
  }

  handleProps(auth, self) {
    const { logout, getSelf, snackbarOpen } = this.props;

    // If the user has logged out by some other means, cancel any timeout which may be pending and
    // clear all cached state. There is a small race here in that the timer may fire before we get
    // notified about the log out so the timeout function also makes this same check.
    if(!auth.isLoggedIn || !auth.token) {
      if(this.timeoutID !== null) {
        window.clearTimeout(this.timeoutID);
        this.timeoutID = null;
      }

      // Reset state
      this.authToken = this.expiresAt = this.firstSelf = null;

      // There is no further work to do if the user has logged out.
      return;
    }

    // If this is the first auth token we've seen, cache it.
    if(!this.authToken && auth.token) {
      this.authToken = auth.token;
    }

    // If this is the first self resource we've seen, cache it.
    if(!this.firstSelf && self) {
      this.firstSelf = self;
    }

    // If self ever changes, we need to logout!
    if(this.firstSelf && self && !selvesAreTheSame(this.firstSelf, self)) {
      console.error('Became someone else after re-login');
      logout();

      // This has to be *after* logout because state (including snackbar state) is reset after
      // logout.
      snackbarOpen('Someone else has signed in in another browser window.');
      return;
    }

    // If the access token has changed and we have a cached self resource, dispatch a getSelf
    // action. The new self resource will be checked on the next call to handleProps.
    if(this.firstSelf && auth.token && this.authToken && (this.authToken !== auth.token)) {
      getSelf();
    }

    // If the access token has changed, update our cache. It is important to do this *after* all
    // the checks above which compare this.authToken and auth.token.
    if(this.authToken !== auth.token) {
      this.authToken = auth.token;
    }

    // If expiresAt has changed, update our timeout.
    if(this.expiresAt !== auth.expiresAt) {
      this.expiresAt = auth.expiresAt;

      // Cancel any existing timeout.
      if(this.timeoutID !== null) {
        window.clearTimeout(this.timeoutID);
        this.timeoutID = null;
      }

      // Calculate the timeout delay from the token expiry time.
      const now = (new Date()).getTime();
      const timeoutDelay = auth.expiresAt - now - TIMEOUT_HEAD_ROOM;

      // Sanity check the delay. If it is in the past, immediately log the user out and log a
      // warning to explain ourselves.
      if(timeoutDelay < 0) {
        console.warn('Token had very short timeout.');
        console.warn('Expires at ' + new Date(auth.expiresAt));
        console.warn('Now is ' + new Date(now));
        console.warn('Head room ' + TIMEOUT_HEAD_ROOM / 1000 + ' seconds');
        console.warn('Would therefore fire at ' + new Date(timeoutDelay + now));

        // token has therefore already timed out, just log out
        logout();
        return;
      }

      // Register the new timeout.
      this.timeoutID = window.setTimeout(() => this.handleTimeout(), timeoutDelay);
    }
  }

  // Called before the token times out. Log the user in again.
  handleTimeout() {
    // extract auth state and actions from props
    const { auth, login, logout, snackbarOpen } = this.props;

    // Don't do anything if we're already logged out. The timeout *should* have been cancelled
    // already but it makes sense to be sure with this many moving parts.
    if(!auth.isLoggedIn) { return; }

    // Attempt prompt-less login. Login is an RSAA-style action and when dispatched returns a
    // Promise resolved with the final FSA-style action.
    login({ prompt: false })
      .then(action => {
        const { type } = action;

        // As long as the login didn't fail, we're happy.
        if(type !== LOGIN_FAILURE) { return action; }

        // On failure we log the error to the console and log the user out.
        console.error('Error doing prompt-less login');
        console.error(action.payload.error);
        logout();

        // This has to be *after* logout because state (including snackbar state) is reset after
        // logout.
        snackbarOpen('Your session has timed out.');

        return action;
      });
  }

  componentWillReceiveProps(nextProps) {
    const { auth, self } = nextProps;
    this.handleProps(auth, self);
  }

  render() { return null; }
};

TokenTimeout.propTypes = {
  auth: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    expiresAt: PropTypes.number,
  }).isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getSelf: PropTypes.func.isRequired,
  snackbarOpen: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, lookupApi: { self } }) => ({ auth, self });

TokenTimeout = connect(mapStateToProps, { login, logout, getSelf, snackbarOpen })(TokenTimeout);

export default TokenTimeout;

// Compare the identities of two self resources for equality.
const selvesAreTheSame = (a, b) => (
  (a.identifier.scheme === b.identifier.scheme) &&
  (a.identifier.value === b.identifier.value)
);
