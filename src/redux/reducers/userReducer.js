import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function userReducer(state = initialState.users, action) {
  switch (action.types) {
    case types.LOAD_USERS_SUCCESS:
      return action.users;
    default:
      return state;
  }
}
