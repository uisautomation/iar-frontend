import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/auth';

/**
 * A link whose action will always log the current user out.
 */
const LogoutLink = ({logout, children, ...rest}) => (
  // eslint-disable-next-line
  <a href="#" onClick={logout} {...rest}>{ children }</a>
);

LogoutLink.propTypes = {
  /** Function which dispatches a logout action. Automatically wired up to the logout action. */
  logout: PropTypes.func.isRequired
};

const mapDispatchToProps = { logout };

export default connect(null, mapDispatchToProps)(LogoutLink);
