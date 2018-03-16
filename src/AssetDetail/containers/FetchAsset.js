import { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getAsset, ENDPOINT_ASSETS } from '../../redux/actions/assetRegisterApi';

/**
 * A component which examines the current matched route and fetches the matching asset. Takes a
 * render callback as child which is passed an object with the following shape:
 *
 *   {
 *     asset: <asset object itself, never null, sometimes empty}
 *     isLoading: <true if the asset is loading>
 *   }
 *
 */
class FetchAsset extends Component {
  constructor(...args) {
    super(...args);
    // try to fetch asset if necessary
    const [ props ] = args;
    this.fetchIfNecessary(props);
  }

  componentWillUpdate(nextProps) {
    this.fetchIfNecessary(nextProps);
  }

  fetchIfNecessary({ assetRecord, url, getAsset }) {
    // if there is no asset record fetched for the current url and if that asset record is not
    // loading, fetch it.
    if(!assetRecord || (!assetRecord.fetchedAt && !assetRecord.isLoading)) {
      getAsset(url);
    }
  }

  render() {
    const { assetRecord = { }, children } = this.props;
    return children(assetRecord);
  }
}

FetchAsset.propTypes = {
  match: PropTypes.object.isRequired,
  getAsset: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  // Extract assetId from patch props
  const { match: { params: { assetId } } } = ownProps;

  // Construct asset URL and try to retrieve asset record object from state.
  const url = ENDPOINT_ASSETS + assetId + '/';

  return {
    url: url,
    assetRecord: state.assets.assetsByUrl.get(url),
  };
};

export default withRouter(
  connect(mapStateToProps, { getAsset })(FetchAsset)
);
