import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import { login, logout } from '../redux/actions';

/**
 * A material button which indicates the current sign in state and allows the user to log in or
 * out.
 */
const LoginButton = ({ isLoggedIn, login, logout }) => {
  if (isLoggedIn) {
    return <RaisedButton type='RaisedButton' onClick={logout}>Sign Out</RaisedButton>
  } else {
    return <RaisedButton type='RaisedButton' onClick={login}>Sign In</RaisedButton>
  }
};

LoginButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
});

const mapDispatchToProps = { login, logout };

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
