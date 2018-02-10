import {
  ASSETS_LIST_REQUEST, ASSETS_LIST_SUCCESS, ASSETS_LIST_FAILURE, ASSETS_LIST_RESET,
  ASSETS_DELETE_SUCCESS,
  ASSET_GET_REQUEST, ASSET_GET_SUCCESS, ASSET_GET_FAILURE,
  ASSET_PUT_SUCCESS,
  ASSET_POST_SUCCESS
} from '../actions/assetRegisterApi';

/**
 * State managed by the asset API reducers.
 *
 * This state mirrors the REST API endpoints.
 */
export const initialState = {
  // Boolean indicating whether a request is currently in flight to augment/replace the current
  // list of summaries. I.e. a request which will update the next and/or previous URLs. Note: this
  // does not include "DELETE" requests; although they remove a summary from the list of summaries,
  // they do not modify the next or previous URLs.
  isLoading: false,

  // A JavaScript Date object with the last time a fetch resulted in this state being updated.
  fetchedAt: null,

  // If not-null, this is the URL of the response which last updated this state.
  url: null,

  // If not-null, this URL should be used to fetch results to add to the end of the current asset
  // list in order to extend it.
  next: null,

  // If not-null, this URL should be used to fetch results to add to the beginning of the current
  // asset list in order to extend it.
  previous: null,

  query: {
    // Field and direction which list is currently sorted by. The field is a string and the
    // direction is Direction.ascending or Direction.descending from the assetRegisterApi actions
    // module.
    sort: { field: null, direction: null },

    // Field names and values which correspond to the current filter.
    filter: { },

    // Current search, if any
    search: null,
  },

  // List of asset summaries. An asset summary is imply an object containing the 'url' field of the
  // full asset. Can be used as a key in assetsByUrl.
  summaries: [ ],

  // A Map of asset URLs to the asset resource records. This may contain more assets than
  // referenced in the asset summaries.
  //
  // An asset resource record is an object of the following form:
  //
  //  {
  //    asset: <asset resource>,
  //    isLoading?: <optional boolean indicating if the asset if currently being loaded?
  //    fetchedAt?: <optional date object with the last time this asset was fetched>
  //  }
  //
  // The asset resource may be a "summary" resource with only the url field set if the asset is
  // currently being loaded.
  assetsByUrl: new Map(),
};

// Utility function to add asset from the action payload into the assetsByUrl map. Takes state as
// a first parameter
const stateWithAssetFromAction = (state, action) => {
  const asset = action.payload;
  const assetsByUrl = new Map([
    ...state.assetsByUrl,
    [asset.url, { asset, fetchedAt: new Date() }]
  ]);
  return { ...state, assetsByUrl, url: asset.url };
};

// Utility function to reset asset list in state
const stateWithResetSummaries = state => ({
  ...state,
  isLoading: false, url: null, fetchedAt: null, next: null, previous: null, summaries: [],
});

export default (state = initialState, action) => {
  switch(action.type) {
    case ASSETS_LIST_REQUEST: {
      // Extract url and query used to fetch this request from action metadata
      const { url, query } = action.meta;
      return { ...state, ...query ? { query } : { }, url, isLoading: true };
    }

    case ASSETS_LIST_SUCCESS: {
      // Extract next, previous and result list from request payload
      const { next, previous, results } = action.payload;

      // Extract url and query used to fetch this request from action metadata
      const { url, query } = action.meta;

      // By default, replace summaries with summaries from payload. The summary is just an object
      // with the url extracted. If the URL matches next or previous, append the previous sumary
      // list to the head or tail as appropriate.
      const summaries = [
        ...url === state.next ? state.summaries : [],
        ...results.map(({ url }) => ({ url })),
        ...url === state.previous ? state.summaries : [],
      ];

      // construct new mapping of urls -> assets
      const assetsByUrl = new Map([
        // iterate over the original mapping
        ...state.assetsByUrl,

        // and then iterate over the list of new objects
        ...results.map(asset => [asset.url, { asset, fetchedAt: new Date() }]),
      ]);

      return {
        ...state, ...query ? { query } : { },
        isLoading: false, fetchedAt: new Date(),
        url, next, previous, summaries, assetsByUrl,
      };
    }

    case ASSETS_LIST_FAILURE:
      return {...state, isLoading: false };

    case ASSETS_LIST_RESET:
      // Usually this is performed as a side-effect of adding or modifying an asset but it can be
      // performed explicitly.
      return stateWithResetSummaries(state);

    case ASSETS_DELETE_SUCCESS:
      // Delete the matching summary.
      return {
        ...state, summaries: state.summaries.filter(asset => asset.url !== action.meta.url)
      };

    case ASSET_GET_REQUEST: {
      // Mark the requested asset as loading
      const { url } = action.meta;
      const assetsByUrl = new Map([...state.assetsByUrl, [url, { asset: { url }, isLoading: true }]]);
      return { ...state, assetsByUrl };
    }

    case ASSET_POST_SUCCESS:
    case ASSET_PUT_SUCCESS:
      // PUT-ting/PUSH-ing a new asset may change the list of assets displayed to the user.
      // Invalidate our cache so it is re-fetched if necessary.
      return stateWithResetSummaries(stateWithAssetFromAction(state, action));

    case ASSET_GET_SUCCESS:
      return stateWithAssetFromAction(state, action);

    case ASSET_GET_FAILURE: {
      // Remove the asset which was being requested from assetsByUrl.
      const { url } = action.meta;
      const assetsByUrl = new Map([...state.assetsByUrl]);
      assetsByUrl.delete(url);
      return { ...state, assetsByUrl };
    }

    default:
      return state;
  }
};
