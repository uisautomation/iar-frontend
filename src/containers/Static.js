import React from 'react';
import Page from '../containers/Page';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const TITLES = {
  '/static/what-is-asset': 'What is an information asset?',
  '/static/what-i-do': 'What do I need to do?',
  '/static/feedback': 'Feedback',
  '/static/contact': 'Contact',
  '/static/tcs': 'Terms & Conditions',
};

/*
  Renders the app bar of the IAR app's static pages.
 */
const StaticHeader = ({ title }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit">
        { title }
      </Typography>
    </Toolbar>
  </AppBar>
);

/*
  Renders the IAR app's static pages.
 */
const Static = ({ match }) => (
  <Page>
    <div>
      <StaticHeader title={ TITLES[match.url] } />
      <div>
        <h1>Copy for "{ TITLES[match.url] }"</h1>
      </div>
    </div>
  </Page>
);

export default Static;
