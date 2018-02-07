/**
 * Middleware to add authorisation headers to redux-api-middleware RSAA actions.
 *
 * The result of the RSSA action is observed. If it has the following form:
 *
 *    { error: true, payload: { status: 401 } }
 *
 * then the user is signed out. When we have plumbing for this, it would be nicer to sign the user
 * in silently.
 */
import { isRSAA, RSAA } from 'redux-api-middleware';
import { logout } from '../actions';

export default ({ getState, dispatch }) => next => action => {

  // pass non-RSAA actions to next middleware
  if(!isRSAA(action)) { return next(action); }

  // update action with authorisation headers
  const { auth } = getState();
  const headers = (!auth || !auth.isLoggedIn) ?
    { } : { ...action[[RSAA]].headers, 'Authorization': 'Bearer ' + auth.token };
  const updatedAction = {
    ...action,
    [RSAA]: {...action[[RSAA]], headers: headers }
  };

  // pass action to next middleware
  return next(updatedAction).then((action_) => {
    if(action_.error && action_.payload && (action_.payload.status === 401)) {
      // TODO: have a less abrupt UI for this!
      dispatch(logout());
    }
    return action_;
  });
};
