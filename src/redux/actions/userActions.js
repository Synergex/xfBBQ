import * as type from "./actionTypes";
import * as userApi from "../../api/userApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { toast } from "react-toastify";

export function createUserSuccess(user) {
  toast.success("Created user " + user.id);
  return { type: type.CREATE_USER_SUCCESS, user };
}

export function deleteUserSuccess(user) {
  toast.success("Deleted user " + user.id);
  return { type: type.DELETE_USER_SUCCESS, user };
}

export function updateUserSuccess(user) {
  toast.success("Updated user " + user.id);
  return { type: type.UPDATE_USER_SUCCESS, user };
}

export function loadUsersSuccess(users) {
  return { type: type.LOAD_USERS_SUCCESS, users };
}

export function loadUsers() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const users = await userApi.getUsers();
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
      const savedUser = await userApi.saveUser(user);
      user.id
        ? dispatch(updateUserSuccess(savedUser))
        : dispatch(createUserSuccess(savedUser));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function deleteUser(user) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      await userApi.deleteUser(user.id);
      dispatch(deleteUserSuccess(user));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}
