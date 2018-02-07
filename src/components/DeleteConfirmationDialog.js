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
const DeleteConfirmationDialog = ({ url, name, deleteAsset, handleConfirmDelete }) => {
  const actions = [
    <FlatButton label="Cancel" primary={false}
      onClick={() => handleConfirmDelete(url)} />,
    <FlatButton label="Delete" primary={true}
      onClick={() => { deleteAsset(url); handleConfirmDelete(url); }} />,
  ];
  return (
    <Dialog modal={true} open={!!url} actions={actions}>
      Delete <strong>"{ name }"</strong>?
    </Dialog>
  );
};

DeleteConfirmationDialog.propTypes = {
  asset: PropTypes.object,
  deleteAsset: PropTypes.func.isRequired,
  handleConfirmDelete: PropTypes.func.isRequired,
};

const mapStateToProps = ({ assets: { assetsByUrl }, deleteConfirmation: { url } }) => {
  // The asset which is being considered for deletion.
  const assetRecord= assetsByUrl.get(url);
  const { name } = assetRecord ? assetRecord.asset : { };
  return { url, name };
};

const mapDispatchToProps = { deleteAsset, handleConfirmDelete };

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmationDialog);
