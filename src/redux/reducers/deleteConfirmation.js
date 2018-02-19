import { CONFIRM_DELETE, HANDLE_CONFIRM_DELETE } from '../actions/deleteConfirmation';

export const initialState = {
  // If not null, this is the URL of an asset which is being considered for deletion.
  url: null,

  // If true, the user should be prompted to confirm deletion of the asset.
  userShouldConfirm: false,

  // On confirmation of delete, this callback should be called with the URL of the deleted asset
  // and a flag indicating if the user confirmed delete.
  onHandleConfirmDelete: () => null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case CONFIRM_DELETE:
      return {
        ...state,
        url: action.payload.url,
        onHandleConfirmDelete: action.payload.onHandleConfirmDelete,
        userShouldConfirm: true,
      };
    case HANDLE_CONFIRM_DELETE:
      // only actually modify the state if the url in the action payload matches the one being
      // confirmed
      if(action.payload.url === state.url) {
        if(state.onHandleConfirmDelete) {
          state.onHandleConfirmDelete(action.payload.userApprovedRequest);
        }
        return { ...state, userShouldConfirm: false };
      } else {
        return state;
      }
    default:
      return state;
  }
}
