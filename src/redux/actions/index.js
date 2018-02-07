import { login, logout } from './auth';
import { getMoreAssets, deleteAsset, getAsset, updateAsset, createAsset } from './assetRegisterApi';
import { handleConfirmDelete } from './deleteConfirmation';
import { snackbarOpen } from './snackbar';

export {
  login, logout,
  getMoreAssets, deleteAsset, getAsset, updateAsset, createAsset,
  handleConfirmDelete,
  snackbarOpen
};
