import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withDraft } from '../../draft';

import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

import { snackbarOpen } from '../../redux/actions/snackbar';
import { navigate as navigate_to_previous } from "../../previous";

/**
 * A button which saves the current draft. Wraps Button by default, override by specifying the
 * component prop.
 *
 * Unrecognised props are spread to the root element.
 *
 * NB: The unwanted dispatch prop from connect() and staticContext from withRouter is swallowed to
 * avoid spreading it to the root.
 */
const SaveDraftButton = (
  {
    component: Component = Button, children, snackbarOpen, saveDraft, history, location,
    match, staticContext, ...rest
  }
) => {
  return <Component
    onClick={
      () => saveDraft().then(({error, payload}) => {
        if (!error) {
          snackbarOpen('"' + (payload.name ? payload.name : payload.id) + '" saved.');
          navigate_to_previous(history, location);
        }
      })
    }
    {...rest}
  >
    {children}
  </Component>
};

SaveDraftButton.propTypes = {
  ...Button.propTypes,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  snackbarOpen: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(
  connect(null, { snackbarOpen })(
    withDraft((draftObject, ownProps, { saveDraft }) => ({ saveDraft }))(
      SaveDraftButton
    )
  )
);
