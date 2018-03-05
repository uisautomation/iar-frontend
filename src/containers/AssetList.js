import React, { Component } from 'react'; // used implicitly by JSX
import PropTypes from 'prop-types';
import AssetListHeader from '../components/AssetListHeader';
import AssetTable from '../components/AssetTable';
import Page from '../containers/Page';
import GetMoreAssets from '../components/GetMoreAssets';
import { withRouter } from 'react-router'
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { getAssets, Direction } from '../redux/actions/assetRegisterApi';

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
      const { query, match : {params: {filter}} } = this.props;
      const { sort: { field } } = query;
      if(field !== null) {
        this.getAssetsFilteredByDept(query, filter);
      } else {
        this.getAssetsFilteredByDept({ ...query, ...DEFAULT_QUERY }, filter);
      }
    }
  }

  /**
   * If the department filter has changed then re-fetch the list.
   */
  componentWillReceiveProps({match : {params: {filter: nextFilter}} }) {
    const {match : {params: {filter}}, query} = this.props;
    if (nextFilter !== filter) {
      this.getAssetsFilteredByDept(query, nextFilter);
    }
  }

  /**
   * Method to apply or remove a department filter to a getAssets() call.
   */
  getAssetsFilteredByDept(query, filter = null) {
    if (filter) {
      query.filter = {...query.filter, department: filter}
    } else {
      delete query.filter.department
    }

    this.props.getAssets(query);
  }

  render() {
    const { institution, classes } = this.props;
    return (
      <Page>
        <AssetListHeader title={'Assets: ' + (institution ? institution.name : 'All institutions')} />

        {/* Table of currently loaded assets. */}
        <div className={classes.content}>
          <AssetTable />
        </div>

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
  // map the institution selected by the filter - if any.
  const institutions = (self && self.institutions ? self.institutions : []);
  const institution = institutions.find(institution => institution.instid === filter);
  return { fetchedAt, query, institution };
};

const mapDispatchToProps = { getAssets };

const styles = theme => ({
  content: {
    paddingTop: theme.spacing.unit * 8,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(withRouter(AssetList))
);
