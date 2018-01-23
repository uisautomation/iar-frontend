import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, RaisedButton } from 'material-ui';
import '../style/App.css'

/*
  Renders the app bar of the form for the creation/editing of an Asset.
  */
const AssetFormHeader = ({ title }) => (
  <div className="App-header">
    <AppBar title={ title } iconElementRight={
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
);

/*
  Renders the form for the creation/editing of an Asset.
  */
const AssetForm = ({ match }) => (
  <div>
    <AssetFormHeader title={match.url === '/asset/create' ? 'Create new asset' : 'Editing: Some asset'} />
    <div className="App-main">
      <h1>Asset Creation/Editing Form</h1>
    </div>
  </div>
);

export default AssetForm
