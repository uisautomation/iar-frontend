import { applyMiddleware } from 'redux';
import { authMiddleware as auth } from 'redux-implicit-oauth2';
import { apiMiddleware as api } from 'redux-api-middleware';
import apiAuth from './middlewares/apiAuth';
import logger from 'redux-logger';

export const middlewares = [auth, apiAuth, api, logger];

/**
 * Dispatch "enhancer" for redux. In our case it is simply the list of middlewares we apply.
 */
const enhancer = applyMiddleware(...middlewares);

export default enhancer;
