import { combineReducers } from 'redux';
import { authReducer as auth } from 'redux-implicit-oauth2';

/**
 * Combine all reducers used in the application together into one reducer.
 */
export default combineReducers({ auth });
