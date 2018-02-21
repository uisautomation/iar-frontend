import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

import { saveDraft } from '../../redux/actions/editAsset';
import { snackbarOpen } from '../../redux/actions/snackbar';

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
    component: Component = Button, children,
    snackbarOpen, saveDraft, dispatch,
    staticContext, history, match, location,
    ...rest
  }
) => (
  <Component
    onClick={
      () => saveDraft().then(({ error, payload }) => {
        if(!error) {
          snackbarOpen('"' + (payload.name ? payload.name : payload.id) + '" saved.');
          history.goBack();
        }
      })
    }
    {...rest}
  >
    { children }
  </Component>
);

SaveDraftButton.propTypes = {
  ...Button.propTypes,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  snackbarOpen: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(connect(null, { saveDraft, snackbarOpen })(SaveDraftButton));
