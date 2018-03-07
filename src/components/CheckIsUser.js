import { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";

export const NOT_A_USER_PATH = '/not_a_user';

/**
 * A component which checks that the user has been configured as a user of the application.
 * Specifically it checks if the user is in the REACT_APP_IAR_USERS_GROUP. If they aren't,
 * the user is redirected to a page explaining why they can't access the system.
 */
class CheckIsUser extends Component {

  componentWillMount = () => {
    const { inIARUsersGroup, history: {push, location: {pathname}} } = this.props;

    // only redirect to NOT_A_USER_PATH if they are not already on it
    if (!inIARUsersGroup && pathname !== NOT_A_USER_PATH) {
      push(NOT_A_USER_PATH);
    }

    // in case the user is still on NOT_A_USER_PATH when they haven't been given access
    // and sign back in
    if (inIARUsersGroup && pathname === NOT_A_USER_PATH) {
      push('/');
    }
  };

  render = () => null;
}

CheckIsUser.propTypes = {
  inIARUsersGroup : PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ lookupApi: { self: { groups } } }) => ({
  inIARUsersGroup :
    !!groups.find((group) => (group.name === process.env.REACT_APP_IAR_USERS_GROUP))
});

export default connect(mapStateToProps)(withRouter(CheckIsUser));
