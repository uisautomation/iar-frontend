import { deleteAsset } from './assetRegisterApi';

export const CONFIRM_DELETE = Symbol('CONFIRM_DELETE');
export const HANDLE_CONFIRM_DELETE = Symbol('HANDLE_CONFIRM_DELETE');

/**
 * Confirm delete of an asset. Pass the asset URL to the action to open a modal confirmation
 * dialogue box. Returns a promise which is resolved with the decision and the URL as the first two
 * parameters.
 *
 * Returns a function and requires the redux-thunk middleware.
 */
export const confirmDelete = (url) => dispatch => new Promise((resolve, reject) => {
  dispatch({
    type: CONFIRM_DELETE,
    payload: {
      url, onHandleConfirmDelete: userApprovedRequest => resolve(userApprovedRequest, url),
    },
  });
});

/**
 * HandleConfirm deletion confirmation for an asset. Pass the asset URL to the action. Dispatch the action
 * to either handle_confirm the delete confirmation request or when you have actually enacted it.
 *
 * Pass the decision as the second parameter. If the decision is true, then deleteAsset is
 * dispatched on the asset.
 *
 * Returns a function and requires the redux-thunk middleware.
 */
export const handleConfirmDelete = (url, userApprovedRequest) => dispatch => {
  if(userApprovedRequest) { dispatch(deleteAsset(url)); }
  dispatch({ type: HANDLE_CONFIRM_DELETE, payload: { url, userApprovedRequest } });
};
