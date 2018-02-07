import { SNACKBAR_OPEN, SNACKBAR_CLOSE } from '../actions/snackbar';

export const initialState = {
  message: '',
  isOpen: false,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SNACKBAR_OPEN:
      return { ...state, isOpen: true, message: action.payload.message };
    case SNACKBAR_CLOSE:
      return { ...state, isOpen: false, message: '' };
    default:
      return state;
  }
};
