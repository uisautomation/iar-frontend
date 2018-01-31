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
      return {...state, assets: state.assets.filter((asset) => {
        return asset.url !== action.meta;
      })};
    default:
      return state;
  }
};
