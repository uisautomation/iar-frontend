import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withDraft } from '../../draft';

import { WaitForSelf } from '../../waiting';

import { DEFAULT_ASSET } from '../../redux/actions/editAsset';

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
    const { fetchOrCreateDraft, selfInstitutions } = this.props;

    // construct a template for new assets
    const template = { ...DEFAULT_ASSET };

    // Attempt to pre-populate the department field from the signed in user's institution if there
    // is only one
    if(selfInstitutions && (selfInstitutions.length === 1)) {
      template.department = selfInstitutions[0].instid;
    }

    // construct URL for asset or null if we're creating a new asset. We know if we're creating
    // new asset because the assetId will be undefined.
    const url = assetId ? process.env.REACT_APP_ENDPOINT_ASSETS + assetId + '/' : null;

    // pass this URL (or null) to fetchOrCreateDraft to populate a new draft
    fetchOrCreateDraft(url, template);
  }

  render = () => null;
}

FetchOrCreateDraft.propTypes = {
  match: PropTypes.object.isRequired,
  fetchOrCreateDraft: PropTypes.func.isRequired,
  selfInstitutions: PropTypes.arrayOf(
    PropTypes.shape({
      instid: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = ({ lookupApi: { self } }) => ({
  selfInstitutions: self.institutions,
});

FetchOrCreateDraft = connect(mapStateToProps)(withRouter(
  withDraft((draftObject, ownProps, { fetchOrCreateDraft }) => ({ fetchOrCreateDraft }))(
    FetchOrCreateDraft
  )
));

// Note: we wrap FetchOrCreateDraft in WaitForSelf to ensure that it is only mounted once
// the user's institutions are available.
export default () => <WaitForSelf><FetchOrCreateDraft /></WaitForSelf>;
