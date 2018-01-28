import { createStore } from 'redux';
import reducer from './reducers';
import reduxEnhancer from './enhancer';

/**
 * Configure the redux store.
 *
 * We use a Promise here to allow for asynchronous configuration in the future.
 *
 * @return Promise<Store> Promise resolved with the redux store for the
 * application.
 */
export default (initialState = {}) => {
  const store = createStore(reducer, initialState, reduxEnhancer);
  return Promise.resolve({store});
}
