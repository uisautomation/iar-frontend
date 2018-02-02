import React from 'react';
import { Link } from 'react-router-dom'
import { AppBar, RaisedButton } from 'material-ui';

/*
  Renders the app bar of the list view of Assets.
  */
const AssetListHeader = ({ title }) => (
  <div className="App-header">
    <AppBar title={ title } iconElementRight={
      <Link className='App-raised-button-link' to="/asset/create">
        <RaisedButton label="Create Asset"/>
      </Link>
    } />
  </div>
);

export default AssetListHeader;
