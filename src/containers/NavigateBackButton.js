/**
 * Button to go back in router history programmatically
 */
import React from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// TODO: Check for history, if false redirect to /assets/dept
const NavigateBackButton = ({history}) => (
  <IconButton color="inherit" aria-label="Go back" onClick={() => history.goBack()}>
    <ArrowBack />
  </IconButton>
);

export const UnconnectedNavigateBackButton = NavigateBackButton;

export default withRouter(NavigateBackButton);

NavigateBackButton.propTypes = {
  history: PropTypes.object.isRequired,
};