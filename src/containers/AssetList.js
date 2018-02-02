// eslint-disable-next-line
import React, {Component} from 'react'; // used implicitly by JSX
import PropTypes from 'prop-types';
import AssetListItem from '../components/AssetListItem';
import AssetListHeader from '../components/AssetListHeader';
import AssetTable from '../components/AssetTable';
import Page from '../containers/Page';
import { connect } from 'react-redux';
import { getAssetList } from '../redux/actions';

import '../style/App.css';

const TITLES = {
  '/assets/dept': 'Assets: My department',
  '/assets/all': 'Assets: All',
};


class AssetList extends React.Component {
  componentDidMount() {
    this.props.getAssetList();
  }

  render() { return (
    <Page>
      <AssetListHeader title={TITLES[this.props.match.url]} />
      <AssetTable>{
        this.props.assets.map( asset => (
          <AssetListItem key={asset.url} asset={asset} />
        ))
      }
      </AssetTable>
    </Page>);
  }
};

AssetList.propTypes = {
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAssetList: PropTypes.func.isRequired,
};

const mapStateToProps = ({ iarApi }) => ({ assets: iarApi.assets });

const mapDispatchToProps = { getAssetList };

export default connect(mapStateToProps, mapDispatchToProps)(AssetList);
