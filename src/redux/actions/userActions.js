import * as type from "./actionTypes";
import * as userAPI from "../../api/userApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function createUserSuccess(user) {
  return { type: type.CREATE_USER_SUCCESS, user };
}

export function loadUsersSuccess(users) {
  return { type: type.LOAD_USERS_SUCCESS, users };
}

export function loadUsers() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const users = await userAPI.getUsers();
      dispatch(loadUsersSuccess(users));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function saveUser(user) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const savedUser = await userAPI.saveUser(user);
      dispatch(createUserSuccess(savedUser));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}
