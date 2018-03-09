import React from 'react';
import { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../history'
import { WaitForSelf } from "../waiting";

export const NOT_A_USER_PATH = '/no_permission';

/**
 * A component which checks that the user has been configured as a user of the application.
 * Specifically it checks if the user is in the REACT_APP_IAR_USERS_GROUP. If they aren't,
 * the user is redirected to a page explaining why they can't access the system.
 */
class UnconnectedCheckIsUser extends Component {

  componentWillMount = () => {
    const { inIARUsersGroup } = this.props;
    const { push, location: { pathname } } = history;

    // only redirect to NOT_A_USER_PATH if they are not already on it
    if (!inIARUsersGroup && pathname !== NOT_A_USER_PATH) {
      push(NOT_A_USER_PATH);
    }
  };

  render = () => null;
}

UnconnectedCheckIsUser.propTypes = {
  inIARUsersGroup : PropTypes.bool.isRequired,
};

const mapStateToProps = ({ lookupApi: { self: { groups } } }) => ({
  inIARUsersGroup :
    !!groups.find((group) => (group.name === process.env.REACT_APP_IAR_USERS_GROUP))
});

const CheckIsUser = connect(mapStateToProps)(UnconnectedCheckIsUser);

// Wrap exported CheckIsUser in WaitForSelf
export default props => (
  <WaitForSelf><CheckIsUser{...props} /></WaitForSelf>
);
