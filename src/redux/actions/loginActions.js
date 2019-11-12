import * as type from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loginUserSuccess(login) {
  return { type: type.LOGIN_USER_SUCCESS, login };
}

export function loginUser(user) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      dispatch(loginUserSuccess(user));
    } catch (e) {
      dispatch(apiCallError(e));
      throw e;
    }
  };
}
