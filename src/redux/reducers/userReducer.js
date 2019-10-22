import initialState from "./initialState";
import * as type from "../actions/actionTypes";

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case type.LOAD_USERS_SUCCESS:
      return action.users;
    default:
      return state;
  }
}
