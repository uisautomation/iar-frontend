import React from 'react'
import { Route, Link } from 'react-router-dom'
import { AppBar, RaisedButton } from 'material-ui'
import '../style/App.css';

const CANCEL_LINK = <Link className='App-raised-button-link' to="/">Cancel</Link>;
const SAVE_LINK = <Link className='App-raised-button-link' to="/">Save</Link>;
const CREATE_LINK = <Link className='App-raised-button-link' to="/asset/create">Create Asset</Link>;

const TITLES = {
  '/assets/dept': 'Assets: My department',
  '/assets/edited': 'Assets: Edited recently',
  '/assets/all': 'Assets: All',
  '/static/what-is-asset': 'What is an information asset?',
  '/static/what-i-do': 'What do I need to do?',
  '/static/feedback': 'Feedback',
  '/static/contact': 'Contact',
  '/static/tcs': 'Terms & Conditions',
  '/asset/create': 'Create new Asset',
};

const Header = () => {
  return <div className="App-header">
    <header>
      {["/assets/:filter", "/static/:page"].map(path =>
        <Route path={path}  render={({ match }) => (
          <AppBar title={TITLES[match.url]} iconElementRight={<RaisedButton children={CREATE_LINK}/>} />
        )} />
      )}
      <Route path="/asset/:asset" render={({ match }) => (
        <AppBar title={TITLES[match.url] ? TITLES[match.url] : "Editing: Some Resource Or Other"} iconElementRight={
          <span>
            <RaisedButton primary={true} children={CANCEL_LINK}/>
            &nbsp;
            <RaisedButton children={SAVE_LINK}/>
          </span>
        } />
      )} />
    </header>
  </div>
};

export default Header
