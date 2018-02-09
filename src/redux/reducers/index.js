import { combineReducers } from 'redux';
import { authReducer as auth } from 'redux-implicit-oauth2';
import assets from './assetRegisterApi';
import deleteConfirmation from './deleteConfirmation';
import snackbar from './snackbar';
import lookupApi from './lookupApi';

/**
 * Combine all reducers used in the application together into one reducer.
 */
export default combineReducers({ auth, assets, deleteConfirmation, snackbar, lookupApi });
