import React from 'react'; // used implicitly by JSX
import PropTypes from 'prop-types';
import AssetListHeader from '../components/AssetListHeader';
import AssetTable from '../components/AssetTable';
import Page from '../containers/Page';
import GetMoreAssets from '../components/GetMoreAssets';
import { withRouter } from 'react-router'

import '../style/App.css';

const TITLES = {
  '/assets/dept': 'Assets: My department',
  '/assets/all': 'Assets: All',
};

const AssetList = ({ match }) => (
  <Page>
    <AssetListHeader title={TITLES[match.url]} />

    {/* Table of currently loaded assets. */}
    <AssetTable />

    <div style={{textAlign: 'center'}}>
      {/* When this component becomes visible more assets are loaded to populate the table. */}
      <GetMoreAssets />
    </div>
  </Page>
);

AssetList.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(AssetList);
