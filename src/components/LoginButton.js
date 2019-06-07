import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { login, logout } from '../redux/actions/auth';

/**
 * A material button which indicates the current sign in state and allows the user to log in or
 * out.
 */
const LoginButton = ({ isLoggedIn, login, logout }) => {
  if (isLoggedIn) {
    return <Button variant="raised" type='Button' color={"primary"} onClick={logout}>Sign out</Button>
  } else {
    return <Button variant="raised" type='Button' color={"primary"} onClick={login}>Sign in with Raven</Button>
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
