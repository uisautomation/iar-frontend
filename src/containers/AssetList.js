import React, { Component } from 'react'; // used implicitly by JSX
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import _ from "lodash";
import Page from '../containers/Page';
import { getAssets, Direction } from '../redux/actions/assetRegisterApi';
import { AssetListHeader, AssetTable, GetMoreAssets } from "../components";

// Default query to use if none has previously been set by the user.
export const DEFAULT_QUERY = {
  sort: { field: 'updated_at', direction: Direction.descending },
};

class AssetList extends Component {

  componentDidMount() {
    // Fetch an asset list. If there is currently a sort query set by the user, use that.
    // Otherwise update the query with a default sort.
    const { query, match : {params: {filter: department}}, location } = this.props;
    const { sort: { field } } = query;

    // HACK: allow ?q=<....> to be added to URLs to enable search feature
    // This HACK is intended to aid the UX team in searching through entries to evaluate how
    // people are getting on adding entries. It makes use of URLSearchParams which is not
    // supported on IE11 and also exposes functionality which has not been fully baked so, once
    // UX are done, this needs to be removed.
    let search = null;
    if(location.search && (location.search !== '')) {
      // there was some query string added to the URL, parse it
      const parsedSearch = new URLSearchParams(location.search);

      // if there is a q=<...> parameter, extract it and set the search
      if(parsedSearch.has('q')) { search = parsedSearch.get('q'); }
    }

    if (field !== null) {
      this.getAssets(query, this.updateQueryWithDept({ ...query, search }));
    } else {
      this.getAssets(query, this.updateQueryWithDept({ ...query, ...DEFAULT_QUERY, search }));
    }
  }

  /**
   * Apply the current department filter and then (attempt to) re-fetch the list.
   */
  componentDidUpdate() {
    const { query } = this.props;
    this.getAssets(query, this.updateQueryWithDept(query));
  }

  /**
   * Updates the passed query with the current department defined in the url.
   * Return's an updated copy.
   */
  updateQueryWithDept(query) {
    const { match : { params: { filter: department } } } = this.props;
    if (department) {
      return { ...query, filter: { ...query.filter, department: department } }
    } else {
      // deletes the department field
      const {department, ...filter} = query.filter;
      return { ...query, filter: filter };
    }
  }

  /**
   * Call getAssets() if the new query doesn't match the old one.
   */
  getAssets(oldQuery, newQuery) {
    if (!_.isEqual(oldQuery, newQuery)) {
      this.props.getAssets(newQuery);
    }
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
