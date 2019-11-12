import initialState from "./initialState";
import * as type from "../actions/actionTypes";

export default function loginReducer(state = initialState.login, action) {
  switch (action.type) {
    case type.LOGIN_USER_SUCCESS:
      return action.login;
    case type.LOGOUT_USER_SUCCESS:
      return { ...state, login: initialState.login };
    default:
      return state;
  }
}
