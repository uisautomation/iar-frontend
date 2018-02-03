import { ASSETS_LIST_SUCCESS, ASSETS_DELETE_SUCCESS } from '../actions/assetRegisterApi';

/**
 * State managed by the asset API reducers.
 *
 * This state mirrors the REST API endpoints.
 */
export const initialState = {
  // Current list of asset summaries fetched from .../assets/ endpoint.
  assets: {
    // If not-null, this URL should be used to fetch results to add to the end of the current asset
    // list in order to extend it.
    next: null,

    // If not-null, this URL should be used to fetch results to add to the beginning of the current
    // asset list in order to extend it.
    previous: null,

    // List of asset summaries.
    results: [ ],
  },
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ASSETS_LIST_SUCCESS: {
      const { next, previous, results } = action.payload;
      return { ...state, assets: { ...state.assets, next, previous, results } };
    }
    case ASSETS_DELETE_SUCCESS: {
      return {
        ...state, assets: {
          ...state.assets,
          results: state.assets.results.filter(asset => (asset.id !== action.meta.id))
        }
      };
    }
    default:
      return state;
  }
};
