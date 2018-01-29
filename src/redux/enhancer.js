import { applyMiddleware } from 'redux';
import { authMiddleware as auth } from 'redux-implicit-oauth2';
import logger from 'redux-logger';
import { apiMiddleware as api } from 'redux-api-middleware';

/**
 * Dispatch "enhancer" for redux. In our case it is simply the list of middlewares we apply.
 */
const enhancer = applyMiddleware(auth, api, logger);

export default enhancer;
