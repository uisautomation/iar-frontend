import { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadDraft } from '../../redux/actions/editAsset';

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
    const { loadDraft } = this.props;

    // construct URL for asset or null if we're creating a new asset
    const url = (assetId === 'create')
      ? null : process.env.REACT_APP_ENDPOINT_ASSETS + assetId + '/';

    // pass this URL (or null) to loadDraft to populate a new draft
    loadDraft(url);
  }

  render = () => null;
}

FetchOrCreateDraft.propTypes = {
  match: PropTypes.object.isRequired,
  loadDraft: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { loadDraft })(FetchOrCreateDraft));
