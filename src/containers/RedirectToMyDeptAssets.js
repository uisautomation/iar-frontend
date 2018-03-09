import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { WaitForSelf } from '../waiting';

/**
 * A container component which a) waits for the users institutions to load and b) redirects to the
 * list of assets from the user's primary institution.
 */
const UnconnectedRedirectToMyDeptAssets = ({ primaryInstid }) => (
  <Redirect to={'/assets/' + primaryInstid} />
);

UnconnectedRedirectToMyDeptAssets.propTypes = {
  primaryInstid: PropTypes.string.isRequired,
};

// Connect RedirectToMyDeptAssets to self profile
const RedirectToMyDeptAssets = connect(
  ({ lookupApi: { self: { institutions } } }) => ({
    primaryInstid: institutions.length > 0 ? institutions[0].instid : ''
  })
)(UnconnectedRedirectToMyDeptAssets);

// Wrap exported RedirectToMyDeptAssets in WaitForSelf
export default props => (
  <WaitForSelf><RedirectToMyDeptAssets {...props} /></WaitForSelf>
);
