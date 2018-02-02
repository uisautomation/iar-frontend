import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, RaisedButton } from 'material-ui';

/*
  Renders the app bar of the form for the creation/editing of an Asset.
  */
const AssetFormHeader = (props) => (
  <div className="App-header">
    <AppBar title={ props.title } iconElementRight={
      <span>
        <Link className='App-raised-button-link' to="/">
          <RaisedButton primary={true} label="Cancel"/>
        </Link>
        &nbsp;
        <RaisedButton label="Save" onClick={props.onClick}/>
      </span>
    } />
  </div>
);

export default AssetFormHeader;
