import { ASSETS_LIST_SUCCESS } from '../actions/assetRegisterApi';

const initialState = {
  assets: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ASSETS_LIST_SUCCESS:
      return Object.assign({}, state, {
        assets: action.payload.results
      });
    default:
      return state;
  }
};
