import initialState from "./initialState";
import * as type from "../actions/actionTypes";

export default function loginReducer(
  state = initialState.loggedInUser,
  action
) {
  switch (action.type) {
    case type.LOGIN_USER_SUCCESS:
      return action.login;
    default:
      return state;
  }
}
