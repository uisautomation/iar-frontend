import React from 'react';
import PropTypes from 'prop-types';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import { Button } from 'material-ui';
import { connect } from 'react-redux';
import { deleteAsset } from '../redux/actions/assetRegisterApi';
import { handleConfirmDelete } from '../redux/actions/deleteConfirmation';

/**
 * A modal dialogue box that asks for confirmation before deleting an asset.
 *
 * The dialogue box is "open" when the URL of the asset being considered for deletion is truthy.
 */
const DeleteConfirmationDialog = ({ url, name, id, deleteAsset, handleConfirmDelete }) => (
  <Dialog open={!!url}>
    <DialogTitle>Delete Asset Permanently?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Once deleteted, the asset <strong>"{ name ? name : id }"</strong> cannot be recovered.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={() => handleConfirmDelete(url)}>
        Cancel
      </Button>
      <Button color="primary" onClick={() => { deleteAsset(url); handleConfirmDelete(url); }}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

DeleteConfirmationDialog.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  deleteAsset: PropTypes.func.isRequired,
  handleConfirmDelete: PropTypes.func.isRequired,
};

const mapStateToProps = ({ assets: { assetsByUrl }, deleteConfirmation: { url } }) => {
  // The asset which is being considered for deletion.
  const assetRecord= assetsByUrl.get(url);
  const { name, id } = assetRecord ? assetRecord.asset : { };
  return { url, name, id };
};

const mapDispatchToProps = { deleteAsset, handleConfirmDelete };

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmationDialog);
