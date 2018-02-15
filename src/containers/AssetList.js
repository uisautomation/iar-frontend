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

// Default query to use if none has previously been set by the user.
export const DEFAULT_QUERY = {
  sort: { field: 'updated_at', direction: Direction.descending },
};

class AssetList extends Component {

  componentDidMount() {
    const { fetchedAt } = this.props;

    // Fetch an asset list if one has not already been fetched. We detect an existing fetch by
    // looking at the "fetchedAt" value on the asset list which should be non-NULL if a fetch
    // happened.
    if(!fetchedAt) {
      // If there is currently a sort query set by the user, use that otherwise update the query
      // with a default sort.
      const { query } = this.props;
      const { sort: { field } } = query;
      if(field !== null) {
        this.getFilteredAssets(query);
      } else {
        this.getFilteredAssets({ ...query, ...DEFAULT_QUERY });
      }
    }
  }

  componentWillReceiveProps({match : {params: {filter: nextFilter}} }) {
    const {match : {params: {filter}}} = this.props;
    if (nextFilter !== filter) {
      this.getFilteredAssets(this.props.query, nextFilter);
    }
  }

  getFilteredAssets(query, filter = null) {
    if (!filter) {
      filter = this.props.match.params.filter;
    }

    if (filter === 'all') {
      delete query.filter.department
    } else {
      query.filter = {...query.filter, department: filter}
    }

    this.props.getAssets(query);
  }

  render() {
    const { institution } = this.props;
    return (
      <Page>
        <AssetListHeader title={'Assets: ' + (institution ? institution.name : 'All departments')} />

        {/* Table of currently loaded assets. */}
        <AssetTable />

        <div style={{textAlign: 'center'}}>
          {/* When this component becomes visible more assets are loaded to populate the table. */}
          <GetMoreAssets />
        </div>
      </Page>
    );
  }
}

AssetList.propTypes = {
  match: PropTypes.object.isRequired,
  fetchedAt: PropTypes.object,
  query: PropTypes.object.isRequired,
};

const mapStateToProps = ({assets: {fetchedAt, query}, lookupApi: {self}}, {match : {params: {filter}}}) => {
  const institutions = (self && self.institutions ? self.institutions : []);
  const institution = institutions.find(institution => institution.instid === filter);
  return { fetchedAt, query, institution };
};

const mapDispatchToProps = { getAssets };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AssetList));
