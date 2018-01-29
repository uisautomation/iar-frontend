import React from 'react'; // used implicitly by JSX
import PropTypes from 'prop-types';
import AssetListHeader from '../components/AssetListHeader';
import AssetTable from '../components/AssetTable';
import Page from '../containers/Page';
import { connect } from 'react-redux';
import { getMoreAssets } from '../redux/actions/assetRegisterApi';

import '../style/App.css';

const TITLES = {
  '/assets/dept': 'Assets: My department',
  '/assets/all': 'Assets: All',
};


class AssetList extends React.Component {
  componentDidMount() {
    this.props.getMoreAssets(this.props.nextUrl);
  }

  render() { return (
    <Page>
      <AssetListHeader title={TITLES[this.props.match.url]} />
      <AssetTable />
    </Page>);
  }
};

AssetList.propTypes = {
  getMoreAssets: PropTypes.func.isRequired,
};

// Export unconnected version of component to aid testing.
export const UnconnectedAssetList = AssetList;

const mapStateToProps = ({ assets }) => ({ nextUrl: assets.next });

const mapDispatchToProps = { getMoreAssets };

export default connect(mapStateToProps, mapDispatchToProps)(AssetList);
