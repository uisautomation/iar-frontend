import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from 'material-ui/Button';

import { confirmDelete } from '../../redux/actions/deleteConfirmation';

/**
 * A container component which passes an onClick prop to a wrapped component which will delete the
 * current entry and go back in history.
 *
 * By default the wrapped component is a button. Override by specifying the component prop.
 *
 * Unrecognised props are spread to the root element.
 */
const DeleteEntryButton = (
  { component: Component = Button, url, confirmDelete,
    history, match, location, staticContext, children, ...rest }
) => (
  <Component
    onClick={() => confirmDelete(url).then(
      userApprovedRequest => { if(userApprovedRequest) { history.goBack(); } }
    )}
    {...rest}
  >{
    children
  }</Component>
);

DeleteEntryButton.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  url: PropTypes.string,
  confirmDelete: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps =  ({ editAsset: { draft: { url } } }) => ({ url });

export default withRouter(connect(mapStateToProps, { confirmDelete })(DeleteEntryButton));
