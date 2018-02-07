export const CONFIRM_DELETE = Symbol('CONFIRM_DELETE');
export const HANDLE_CONFIRM_DELETE = Symbol('HANDLE_CONFIRM_DELETE');

/**
 * Confirm delete of an asset. Pass the asset URL to the action to open a modal confirmation
 * dialogue box.
 */
export const confirmDelete = (url) => ({
  type: CONFIRM_DELETE,
  payload: { url },
});

/**
 * HandleConfirm deletion confirmation for an asset. Pass the asset URL to the action. Dispatch the action
 * to either handle_confirm the delete confirmation request or when you have actually enacted it.
 */
export const handleConfirmDelete = (url) => ({
  type: HANDLE_CONFIRM_DELETE,
  payload: { url },
});
