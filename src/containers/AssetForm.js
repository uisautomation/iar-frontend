import React from 'react'
import AssetFormHeader from '../components/AssetFormHeader'
import Page from '../containers/Page';

/*
  Renders the form for the creation/editing of an Asset.
  */
const AssetForm = ({ match }) => (
  <Page>
    <AssetFormHeader title={match.url === '/asset/create' ? 'Create new asset' : 'Editing: Some asset'} />
    <div>
      <h1>Asset Creation/Editing Form</h1>
    </div>
  </Page>
);

export default AssetForm
