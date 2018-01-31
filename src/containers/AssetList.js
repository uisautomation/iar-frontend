// eslint-disable-next-line
import React, {Component} from 'react'; // used implicitly by JSX
import PropTypes from 'prop-types';
import AssetListItem from '../components/AssetListItem';
import AssetListHeader from '../components/AssetListHeader';
import AssetTable from '../components/AssetTable';
import Page from '../containers/Page';
import { connect } from 'react-redux';
import { assetsList } from '../redux/actions';

import '../style/App.css';

const TITLES = {
  '/assets/dept': 'Assets: My department',
  '/assets/all': 'Assets: All',
};


class AssetList extends React.Component {
  componentDidMount() {
    this.props.assetsList();
  }

  render() { return (
    <Page>
      <AssetListHeader title={TITLES[this.props.match.url]} />
      <AssetTable>{
        this.props.iarApi.assets.map( asset => (
          <AssetListItem
            key={asset.url}
            url={asset.url}
            name={asset.name}
            status={asset.status}
            department={asset.department}
            private={asset.private}
            lastedited={asset.updated_at}
          />
        ))
      }
      </AssetTable>
    </Page>);
  }
};

AssetList.propTypes = {
  iarApi: PropTypes.object.isRequired,
  assetsList: PropTypes.func.isRequired,
};

const mapStateToProps = ({ iarApi }) => ({
  iarApi
});

const mapDispatchToProps = { assetsList };

export default connect(mapStateToProps, mapDispatchToProps)(AssetList);
