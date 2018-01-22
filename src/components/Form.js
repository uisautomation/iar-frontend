import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, RaisedButton } from 'material-ui';
import '../style/App.css'

const Form = ({ match }) => (
  <div>
    <div className="App-header">
      <AppBar title={match.url === '/asset/create' ? 'Create new asset' : 'Editing: Some asset'} iconElementRight={
        <span>
          <RaisedButton primary={true}>
            <Link className='App-raised-button-link' to="/">Cancel</Link>
          </RaisedButton>
          &nbsp;
          <RaisedButton>
            <Link className='App-raised-button-link' to="/">Save</Link>
          </RaisedButton>
        </span>
      } />
    </div>
    <div className="App-main">
      <h1>Asset Creation/Editing Form</h1>
    </div>
  </div>
);

export default Form
