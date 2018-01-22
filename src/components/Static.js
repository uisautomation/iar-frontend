import React from 'react';
import '../style/App.css';

const TITLES = {
  '/static/what-is-asset': 'What is an information asset?',
  '/static/what-i-do': 'What do I need to do?',
  '/static/feedback': 'Feedback',
  '/static/contact': 'Contact',
  '/static/tcs': 'Terms & Conditions',
};

const Static = ({ match }) => (
  <div className="App-main">
    <h1>{ TITLES[match.url] }</h1>
  </div>
);

export default Static;
