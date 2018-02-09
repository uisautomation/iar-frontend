/**
 * Middleware to handle to any failed network api calls.
 *
 * The result of the RSSA action is observed. If an error is flagged the error message is
 * dispatched to the user.
 */
import { snackbarOpen } from '../actions/snackbar';
import {isRSAA} from "redux-api-middleware";

export default ({ getState, dispatch }) => next => action => {

  // pass non-RSAA actions to next middleware
  if(!isRSAA(action)) { return next(action); }

  // pass action to next middleware
  return next(action).then((action_) => {
    if (action_.error && action_.payload) {
      dispatch(snackbarOpen(action_.payload.name + ' - ' + action_.payload.message));
    }
    return action_;
  });
};
