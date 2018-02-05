import {
  NEW_DRAFT, PATCH_DRAFT, LOAD_DRAFT_REQUEST, LOAD_DRAFT_RESPONSE, CLEAR_DRAFT
} from '../actions/editAsset';

export const initialState = {
  // The current asset draft being edited. If the url field is set then the asset is editing an
  // existing asset, otherwise it is a new asset
  draft: { },

  // True if the draft is currently being loaded from the API. If this is true then draft.url
  // points to the asset being loaded but no other fields are populated.
  isLoading: false,

  // True if the draft is "live", i.e. it was set via newDraft or loaded via loadDraft
  isLive: false,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case NEW_DRAFT:
      // replace the entire draft
      return { ...state, draft: action.payload.draft, isLoading: false, isLive: true };
    case LOAD_DRAFT_REQUEST: {
      // a new draft is loading
      const { url } = action.payload;
      return { ...state, draft: { url }, isLoading: true, isLive: false };
    }
    case LOAD_DRAFT_RESPONSE: {
      // draft was loaded (or it failed)
      const { asset, error = false } = action.payload;
      return { ...state, draft: asset, isLoading: false, isLive: !error };
    }
    case PATCH_DRAFT: {
      // update fields in the current draft based on the patch or the value returned from the patch
      // function
      const patch =
        (typeof action.payload.patch === 'function')
        ? action.payload.patch(state.draft) : action.payload.patch;
      return { ...state, draft: { ...state.draft, ...patch } };
    }
    case CLEAR_DRAFT:
      // reset the entire draft
      return { ...state, draft: { }, isLoading: false, isLive: false };
    default:
      return state;
  }
}
