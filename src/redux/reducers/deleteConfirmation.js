import { CONFIRM_DELETE, HANDLE_CONFIRM_DELETE } from '../actions/deleteConfirmation';

export const initialState = {
  // If not null, this is the URL of an asset which is being considered for deletion.
  url: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case CONFIRM_DELETE:
      return {...state, url: action.payload.url};
    case HANDLE_CONFIRM_DELETE:
      // only actually modify the state if the url in the action payload matches the one being
      // confirmed
      if(action.payload.url === state.url) {
        return {...state, url: null };
      } else {
        return state;
      }
    default:
      return state;
  }
}
