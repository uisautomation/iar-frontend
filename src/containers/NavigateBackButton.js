/**
 * Button to go back in router history programmatically
 */
import React from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import { withRouter, Redirect } from 'react-router-dom';

const NavigateBackButton = ({history}) => (
  <IconButton color="inherit" aria-label="Go back" onClick={() => { history ? history.goBack() : <Redirect to='/assets/dept' />}}>
    <ArrowBack />
  </IconButton>
);

export const UnconnectedNavigateBackButton = NavigateBackButton;

export default withRouter(NavigateBackButton);