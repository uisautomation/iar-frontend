export const SNACKBAR_OPEN = 'SNACKBAR_OPEN';
export const SNACKBAR_CLOSE = 'SNACKBAR_CLOSE';

/**
 * Open the global snackbar and set the passed message.
 */
export const snackbarOpen = message => ({
  type: SNACKBAR_OPEN,
  payload: { message },
});

/**
 * Close the global snackbar. Resets the message to the empty string.
 */
export const snackbarClose = () => ({
  type: SNACKBAR_CLOSE,
});
