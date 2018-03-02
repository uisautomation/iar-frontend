/**
 * Components which wait for various resources to be loaded. They all follow the same pattern of
 * rendering their children if and only if the corresponding global resource has loaded. They all
 * take an "loadingIndicator" prop which is a node rendered in place of the children if the
 * resource is unavailable. This indicator defaults to null.
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Generic WaitFor{...} component which is wrapped by higher-order components below.
 *
 * Exported since the test suite needs it.
 */
export const WaitForIt = ({ isLoading, loadingIndicator = null, children }) => (
  isLoading ? loadingIndicator : children
);

WaitForIt.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadingIndicator: PropTypes.node,
};

/**
 * Wait for user's profile
 */
export const WaitForSelf = connect(
  ({ lookupApi: { self, selfLoading } }) => ({ isLoading: !self || selfLoading })
)(WaitForIt);

/**
 * Wait for list of institutions
 */
export const WaitForInstitutions = connect(
  ({ lookupApi: { institutions } }) => ({ isLoading: !institutions || !institutions.fetchedAt })
)(WaitForIt);
