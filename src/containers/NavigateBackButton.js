/**
 * Button to go back in browser history programmatically
 */
import React from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import { withRouter } from 'react-router-dom';

const NavigateBackButton = ({history}) => (
  <IconButton color="inherit" aria-label="Go back" onClick={() => {history.goBack()}}>
    <ArrowBack />
  </IconButton>
);

export default withRouter(NavigateBackButton);