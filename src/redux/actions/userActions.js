import * as types from "./actionTypes";
import * as userAPI from "../../api/userApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadUsersSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users };
}

export function loadUsers() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const users = await userAPI.getUsers();
      dispatch(loadUsersSuccess(users));
    } catch (e) {
      dispatch(apiCallError(e));
      throw e;
    }
  };
}
