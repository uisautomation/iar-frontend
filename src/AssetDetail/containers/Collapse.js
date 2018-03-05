import React from 'react';
import PropTypes from 'prop-types';
import MaterialCollapse from 'material-ui/transitions/Collapse';
import { withDraft } from '../../draft';

/**
 * A container which is collapsed based on the state of the current draft. Use the shouldShow prop
 * to compute whether the component should be shown. It is a function which takes the current draft
 * and returns a boolean. If it returns true then the component is show, if false it is hidden.
 */
const Collapse = withDraft(
  ({ draft }, { shouldShow }) => ({ in: shouldShow(draft) })
)(({ shouldShow, ...rest }) => <MaterialCollapse {...rest} />);

Collapse.propTypes = {
  shouldShow: PropTypes.func.isRequired,
};

export default Collapse;
