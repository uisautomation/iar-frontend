import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { deleteAsset } from '../redux/actions/assetRegisterApi';
import { handleConfirmDelete } from '../redux/actions/deleteConfirmation';

/**
 * A modal dialogue box that asks for confirmation before deleting an asset.
 *
 * The dialogue box is "open" when the URL of the asset being considered for deletion is truthy.
 */
const DeleteConfirmationDialog = ({ asset = {}, deleteAsset, handleConfirmDelete }) => {
  const actions = [
    <FlatButton label="Cancel" primary={false}
      onClick={() => handleConfirmDelete(asset.url)} />,
    <FlatButton label="Delete" primary={true}
      onClick={() => { deleteAsset(asset.url); handleConfirmDelete(asset.url); }} />,
  ];
  return (
    <Dialog modal={true} open={!!asset.url} actions={actions}>
      Delete <strong>"{ asset.name }"</strong>?
    </Dialog>
  );
};

DeleteConfirmationDialog.propTypes = {
  asset: PropTypes.object,
  deleteAsset: PropTypes.func.isRequired,
  handleConfirmDelete: PropTypes.func.isRequired,
};

const mapStateToProps = ({ assets: { assetsByUrl }, deleteConfirmation: { url } }) => ({
  // The asset which is being considered for deletion.
  asset: assetsByUrl.get(url),
});

const mapDispatchToProps = { deleteAsset, handleConfirmDelete };

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmationDialog);
