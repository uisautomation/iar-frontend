import { applyMiddleware } from 'redux';
import { authMiddleware as auth } from 'redux-implicit-oauth2';
import { apiMiddleware as api } from 'redux-api-middleware';
import apiAuth from './middlewares/apiAuth';
import logger from 'redux-logger';

export const middlewares = [auth, apiAuth, api];

// only add logger middleware in development
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

/**
 * Dispatch "enhancer" for redux. In our case it is simply the list of middlewares passed to
 * applyMiddleware.
 */
const enhancer = applyMiddleware(...middlewares);

export default enhancer;
