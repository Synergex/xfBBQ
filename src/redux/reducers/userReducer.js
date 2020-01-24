import initialState from "./initialState";
import * as type from "../actions/actionTypes";

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case type.CREATE_USER_SUCCESS:
      return { ...state, value: [...state.value, { ...action.user }] };
    case type.DELETE_USER_SUCCESS:
      return {
        ...state,
        value: state.value.filter(user => user.Id !== action.user.Id)
      };
    case type.UPDATE_USER_SUCCESS:
      return {
        ...state,
        value: state.value.map(user =>
          user.Id === action.user.Id ? action.user : user
        )
      };
    case type.LOAD_USERS_SUCCESS:
      return action.users;
    default:
      return state;
  }
}
