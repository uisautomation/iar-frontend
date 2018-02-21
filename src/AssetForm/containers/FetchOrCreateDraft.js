import { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchOrCreateDraft } from '../../redux/actions/editAsset';

/**
 * A component which examines the current matched route and fetches or creates a new draft as
 * appropriate.
 */
class FetchOrCreateDraft extends Component {
  componentDidMount = () => {
    const { match: { params: { assetId } } } = this.props;
    this.handleNewAssetId(assetId);
  }

  componentWillReceiveProps = newProps => {
    const { match: { params: { assetId: oldAssetId } } } = this.props;
    const { match: { params: { assetId: newAssetId } } } = newProps;
    if(newAssetId !== oldAssetId) { this.handleNewAssetId(newAssetId); }
  }

  // Called when there is a new asset id, either because we just received a new one or because the
  // component was just mounted
  handleNewAssetId = assetId => {
    const { fetchOrCreateDraft } = this.props;

    // construct URL for asset or null if we're creating a new asset
    const url = (assetId === 'create')
      ? null : process.env.REACT_APP_ENDPOINT_ASSETS + assetId + '/';

    // pass this URL (or null) to fetchOrCreateDraft to populate a new draft
    fetchOrCreateDraft(url);
  }

  render = () => null;
}

FetchOrCreateDraft.propTypes = {
  match: PropTypes.object.isRequired,
  fetchOrCreateDraft: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { fetchOrCreateDraft })(FetchOrCreateDraft));
