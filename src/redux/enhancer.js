import { applyMiddleware } from 'redux';
import { apiMiddleware as api } from 'redux-api-middleware';
import { apiAuth, netError } from './middlewares';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const middlewares = [thunk, apiAuth, netError, api];

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
