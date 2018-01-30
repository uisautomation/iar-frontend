import { ASSETS_LIST_SUCCESS, ASSETS_DELETE_SUCCESS } from '../actions/assetRegisterApi';

const initialState = {
  assets: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ASSETS_LIST_SUCCESS:
      return Object.assign({}, state, {
        assets: action.payload.results
      });
    case ASSETS_DELETE_SUCCESS:
      return state;
      // return state minus deleted asset
    default:
      return state;
  }
};
