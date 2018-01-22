import React from 'react';
import { AppBar } from 'material-ui';
import '../style/App.css';

const TITLES = {
  '/static/what-is-asset': 'What is an information asset?',
  '/static/what-i-do': 'What do I need to do?',
  '/static/feedback': 'Feedback',
  '/static/contact': 'Contact',
  '/static/tcs': 'Terms & Conditions',
};

const Static = ({ match }) => (
  <div>
    <div className="App-header">
      <AppBar title={TITLES[match.url]} />
    </div>
    <div className="App-main">
      <h1>Copy for "{ TITLES[match.url] }"</h1>
    </div>
  </div>
);

export default Static;
