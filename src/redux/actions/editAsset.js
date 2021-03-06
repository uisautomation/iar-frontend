import { getAsset, putAsset, postAsset } from './assetRegisterApi';
import { sanitise } from '../../assets';
import { snackbarOpen } from './snackbar';

export const SET_DRAFT = 'SET_DRAFT';
export const PATCH_DRAFT = 'PATCH_DRAFT';
export const FETCH_DRAFT_REQUEST = 'FETCH_DRAFT_REQUEST';
export const FETCH_DRAFT_SUCCESS = 'FETCH_DRAFT_SUCCESS';
export const SAVE_DRAFT_SUCCESS = 'SAVE_DRAFT_SUCCESS';
export const SAVE_DRAFT_FAILURE = 'SAVE_DRAFT_FAILURE';

// Default values for a new asset
export const DEFAULT_ASSET = {
  name: 'New Asset',
  department: null,
  purpose: null,
  research: null,
  owner: null,
  private: false,
  personal_data: null,
  data_subject: [],
  data_category: [],
  recipients_category: null,
  recipients_outside_eea: null,
  retention: null,
  risk_type: [],
  storage_location: null,
  storage_format: [],
  paper_storage_security: [],
  digital_storage_security: []
};

/**
 * Load an existing asset into the draft. If the asset is present in the global assets.assetsByUrl
 * map then it is used directly, otherwise fetch the asset using the API. If the url is undefined
 * or null, start a new draft using the optional second argument as a template.
 *
 * Implemented as a thunk action so requires the redux-thunk middleware.
 */
export const fetchOrCreateDraft = (url = null, draftAsset = DEFAULT_ASSET) => (dispatch, getState) => {
  // If no url was provided, start an empty draft.
  if(url === null) {
    dispatch(setDraft(draftAsset));
    return;
  }

  // Attempt to extract the asset from assetsByUrl
  const { assets: { assetsByUrl } } = getState();
  const assetRecord = assetsByUrl.get(url);

  if(assetRecord) {
    // If we succeeded, start the new draft immediately.
    dispatch(setDraft(assetRecord.asset));
  } else {
    // Fetch the asset from the API.
    dispatch(fetchOrCreateDraftRequest(url));
    dispatch(getAsset(url))
    .then(() => {
      const { assets: { assetsByUrl } } = getState();
      const assetRecord = assetsByUrl.get(url);
      if(assetRecord) {
        dispatch(fetchOrCreateDraftResponse(assetRecord.asset));
      }
    });
  }
};

/**
 * Internal action dispatched by fetchOrCreateDraft when a network request has been made.
 */
const fetchOrCreateDraftRequest = url => ({
  type: FETCH_DRAFT_REQUEST,
  payload: { url },
});

/**
 * Internal action dispatched by fetchOrCreateDraft when a network response has been received.
 */
const fetchOrCreateDraftResponse = asset => ({
  type: FETCH_DRAFT_SUCCESS,
  payload: { asset },
});

/**
 * Replace the current asset draft. Have the url field of the asset be set if this is editing a
 * current asset, otherwise a new asset will be created.
 */
const setDraft = (draft = {}) => ({
  type: SET_DRAFT,
  payload: { draft },
});

/**
 * Update some field(s) in the current draft. Takes either a simple object whose fields are merged
 * into the current draft or a function which takes the current draft and returns an object whose
 * fields are merged.
 */
export const patchDraft = patch => ({
  type: PATCH_DRAFT,
  payload: { patch },
});

/**
 * Save the current draft but POST-ing or PUT-ing the asset as appropriate.
 *
 * REQUIRES that the editAsset state be under the editAsset property of the global state.
 *
 * If the draft cannot be saved (i.e. if the department field is blank), return a promise which is
 * resolved with an error.
 *
 * The dispatched action returns a promise which is resolved with the dispatched action resulting
 * from the RSAA request.
 *
 * Implemented as a thunk action so requires the redux-thunk middleware.
 */
export const saveDraft = () => (dispatch, getState) => {
  const { editAsset: { draft } } = getState();

  // Can this draft be saved?
  if(!draft || !draft.department || draft.department === '') {
    dispatch(snackbarOpen('Cannot save this entry; the institution field must not be blank.'));
    return Promise.resolve({
      type: SAVE_DRAFT_FAILURE,
      error: true,
    });
  }

  // Make any fixes to the draft prior to saving
  const sanitisedDraft = sanitise(draft);

  // Depending on whether draft.url is set, PUT or POST the asset saving the resulting promise.
  const savePromise = dispatch(
    draft.url ? putAsset(sanitisedDraft) : postAsset(sanitisedDraft)
  );

  return savePromise.then(action => {
    const { error } = action;

    // if save was successful, dispatch an action to indicate that the draft was saved
    if(!error) { dispatch({ type: SAVE_DRAFT_SUCCESS }); }

    return action;
  });
};
