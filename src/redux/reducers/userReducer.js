import initialState from "./initialState";
import * as type from "../actions/actionTypes";

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case type.CREATE_USER_SUCCESS:
      return [...state, { ...action.user }];
    case type.UPDATE_USER_SUCCESS:
      return state.map(user =>
        user.id === action.user.id ? action.user : user
      );
    case type.LOAD_USERS_SUCCESS:
      return action.users;
    default:
      return state;
  }
}
