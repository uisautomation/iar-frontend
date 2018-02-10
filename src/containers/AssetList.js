import React, { Component } from 'react'; // used implicitly by JSX
import PropTypes from 'prop-types';
import AssetListHeader from '../components/AssetListHeader';
import AssetTable from '../components/AssetTable';
import Page from '../containers/Page';
import GetMoreAssets from '../components/GetMoreAssets';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { getAssets, Direction } from '../redux/actions/assetRegisterApi';

import '../style/App.css';

const TITLES = {
  '/assets/dept': 'Assets: My department',
  '/assets/all': 'Assets: All',
};

// Default query to use if none has previously been set by the user.
export const DEFAULT_QUERY = {
  sort: { field: 'updated_at', direction: Direction.descending },
};

class AssetList extends Component {
  componentDidMount() {
    const { getAssets, lastAssetListUrl } = this.props;

    // Fetch an asset list if one has not already been fetched. We detect a fetch by looking at the
    // "url" property in the assets state which is exposed as the "lastAssetListUrl" prop.
    if(!lastAssetListUrl) {
      // If there is currently a sort query set by the user, use that otherwise update the query
      // with a default sort.
      const { query } = this.props;
      const { sort: { field } } = query;
      if(field !== null) {
        getAssets(query);
      } else {
        getAssets({ ...query, ...DEFAULT_QUERY });
      }
    }
  }

  render() {
    const { match } = this.props;
    return (
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
  }
};

AssetList.propTypes = {
  match: PropTypes.object.isRequired,
  lastAssetListUrl: PropTypes.string,
  query: PropTypes.object.isRequired,
};

const mapStateToProps = ({ assets: { url: lastAssetListUrl, query } }) => (
  { lastAssetListUrl, query }
);

const mapDispatchToProps = { getAssets };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AssetList));
