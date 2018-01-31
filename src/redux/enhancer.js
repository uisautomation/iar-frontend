import { applyMiddleware } from 'redux';
import { authMiddleware as auth } from 'redux-implicit-oauth2';
import logger from 'redux-logger';

/**
 * Dispatch "enhancer" for redux. In our case it is simply the list of middlewares we apply.
 */
const enhancer = applyMiddleware(auth, logger);

export default enhancer;
