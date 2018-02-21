import { withDraft } from './draft';

import PropTypes from 'prop-types';

/**
 * A container which takes a render callback as a child which takes one argument, isExistingAsset.
 * This is true if the current draft was loaded from an existing asset and false if we're editing a
 * brand new draft.
 *
 */
const DraftIsExistingAsset = ({ isExistingAsset, children }) => children(isExistingAsset);

DraftIsExistingAsset.propTypes = {
  isExistingAsset: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
};

export default withDraft(({ url }) => ({ isExistingAsset: Boolean(url) }))(DraftIsExistingAsset);
