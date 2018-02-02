import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import LoginPage from '../containers/LoginPage';

export const DEFAULT_IF_LOGGED_OUT = <LoginPage />;

/**
 * A Route-alike which requires that a user be logged in. If the user is not logged in then a
 * fallback component specified by the componentIfLoggedOut prop is rendered. If this prop is not
 * given then the DEFAULT_IF_LOGGED_OUT component exported from this module is used.
 *
 * Based on https://reacttraining.com/react-router/web/example/auth-workflow
 */
const LoginRequiredRoute = ({
  isLoggedIn,
  component: Component,
  componentIfLoggedOut = DEFAULT_IF_LOGGED_OUT,
  ...rest
}) => (
  <Route
    {...rest}
    render={ props => isLoggedIn ? <Component {...props} /> : componentIfLoggedOut }
  />
);

LoginRequiredRoute.propTypes = {
  /** Is the user logged in or not? This prop is automatically connected to the auth.isLoggedIn
   * value in the store. */
  isLoggedIn: PropTypes.bool.isRequired,
  /** The component to render if the route matches *and* the user is logged out. */
  componentIfLoggedOut: PropTypes.element,
}

/**
 * State mapping for LoginRequiredRoute component.
 *
 * It is assumed that the global state has an auth.isLoggedIn boolean which reflects the current
 * login state. This is mapped to the isLoggedIn prop of LoginRequiredRoute.
 */
const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
});

export default connect(mapStateToProps)(LoginRequiredRoute);
