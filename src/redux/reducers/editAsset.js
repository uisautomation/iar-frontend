import {
  SET_DRAFT, PATCH_DRAFT, FETCH_DRAFT_REQUEST, FETCH_DRAFT_SUCCESS, SAVE_DRAFT_SUCCESS
} from '../actions/editAsset';

export const initialState = {
  // The current asset draft being edited. If the url field is set then the asset is editing an
  // existing asset, otherwise it is a new asset
  draft: { },

  // True if the draft is currently being loaded from the API. If this is true then draft.url
  // points to the asset being loaded but no other fields are populated.
  isLoading: false,

  // True if the draft is "live", i.e. it was successfully set via fetchOrCreateDraft
  isLive: false,

  // True if the draft has been modified from its initial fetched or set state.
  isModified: false,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_DRAFT:
      // replace the entire draft
      return {
        ...state, draft: action.payload.draft, isLoading: false, isLive: true, isModified: false
      };
    case FETCH_DRAFT_REQUEST: {
      // a new draft is loading
      const { url } = action.payload;
      return { ...state, draft: { url }, isLoading: true, isLive: false, isModified: false };
    }
    case FETCH_DRAFT_SUCCESS: {
      // draft was loaded
      const { asset } = action.payload;
      return { ...state, draft: asset, isLoading: false, isLive: true, isModified: false };
    }
    case PATCH_DRAFT: {
      // update fields in the current draft based on the patch or the value returned from the patch
      // function
      const patch =
        (typeof action.payload.patch === 'function')
        ? action.payload.patch(state.draft) : action.payload.patch;
      return { ...state, draft: { ...state.draft, ...patch }, isModified: true };
    }
    case SAVE_DRAFT_SUCCESS:
      return { ...state, isModified: false };
    default:
      return state;
  }
}
