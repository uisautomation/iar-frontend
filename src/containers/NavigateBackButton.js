/**
 * Button to go back in router history programmatically
 */
import React from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import { withRouter, Redirect } from 'react-router-dom';

// TODO: Check for history, if false redirect to /assets/dept
const NavigateBackButton = ({history}) => (
  <IconButton color="inherit" aria-label="Go back" onClick={() => { history.goBack() }}>
    <ArrowBack />
  </IconButton>
);

export const UnconnectedNavigateBackButton = NavigateBackButton;

export default withRouter(NavigateBackButton);