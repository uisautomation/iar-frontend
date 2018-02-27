import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import { LinearProgress } from 'material-ui/Progress';

/**
 * A component which displays a full page loading indicator until the following global resources
 * are available:
 *
 * - The user is logged in
 * - The global list of institutions is fetched
 * - The user's "self" resource is loaded
 *
 * The child components are only rendered when the resources are loaded and so you may rely on
 * these resources being present in the children's render() and componentDidMount() methods.
 */

// Return true iff required global assets are loaded. Passed the redux state.
const resourcesAreLoaded = ({ lookupApi, auth }) => {
  const { self, selfLoading, institutions } = lookupApi;
  const { isLoggedIn } = auth;

  // User is logged in
  if(!isLoggedIn) { return false; }

  // Global list of institutions is loaded
  if(!institutions || !institutions.fetchedAt) { return false; }

  // User's self resource is loaded
  if(selfLoading || !self) { return false; }

  // Everything is loaded
  return true;
}

const WaitForGlobals = ({ isLoaded, classes, children }) => (
  <div>
    <div className={`${isLoaded ? classes.loaded : classes.notLoaded} ${classes.loadingScreen}`}>
      <LinearProgress className={classes.progress} />
    </div>
    {
      // Children are only rendered only when isLoaded becomes true.
      isLoaded ? children : null
    }
  </div>
);

WaitForGlobals.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isLoaded: resourcesAreLoaded(state)
});

const styles = theme => ({
  loadingScreen: {
    zIndex: theme.zIndex.modal,
    position: 'absolute',
    display: 'flex',
    left: 0, right: 0, width: '100%', height: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loaded: {
    visibility: 'hidden',
    opacity: 0,
    transition: [
      theme.transitions.create('opacity'),
      theme.transitions.create('visibility', { delay: theme.transitions.duration.standard }),
    ],
  },

  notLoaded: {
    visibility: 'visible',
    opacity: 1,
    transition: [
      theme.transitions.create('opacity'),
    ],
  },

  progress: {
    position: 'fixed',
    left: 0, top: 0, width: '100%',
  },
});

export default connect(mapStateToProps)(withStyles(styles)(WaitForGlobals));
