import { combineReducers } from 'redux';
import { authReducer as auth } from 'redux-implicit-oauth2';
import assets from './assetRegisterApi';
import deleteConfirmation from './deleteConfirmation';
import snackbar from './snackbar';
import lookupApi from './lookupApi';

import { LOGOUT } from 'redux-implicit-oauth2';

/**
 * Combine all reducers used in the application together into one reducer.
 */
export const reducers = combineReducers({ auth, assets, deleteConfirmation, snackbar, lookupApi });

/**
 * The default export wraps all reducers in a catch all reducer which resets state on LOGOUT. This
 * ensures that, by default, the state after logout is identical to a fresh load of the
 * application. Reducers which want to do something special on LOGOUT may look at the
 * "originalState" property which is added to the LOGOUT action. This property is given the
 * original state before logout.
 */
export default (state, action) => {
  // In the case of LOGOUT, we forcibly reset state to the initial state by passing undefined as
  // the current state. Reducers which wish to do something special on LOGOUT may inspect the
  // originalState parameter added to the action.
  if(action.type === LOGOUT) { return reducers(undefined, { ...action, originalState: state }); }

  // Otherwise, we pass the action to the usual reducer chain.
  return reducers(state, action);
};
