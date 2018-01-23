import React from 'react'
import AssetFormHeader from '../components/AssetFormHeader'

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
