import { applyMiddleware } from 'redux';
import { authMiddleware as auth } from 'redux-implicit-oauth2';
import logger from 'redux-logger';
import { apiMiddleware as api } from 'redux-api-middleware';

export const middlewares = [auth, api];

/**
 * Dispatch "enhancer" for redux. In our case it is simply the list of middlewares passed to
 * applyMiddleware.
 */
const enhancer = applyMiddleware(...middlewares, logger);

export default enhancer;
