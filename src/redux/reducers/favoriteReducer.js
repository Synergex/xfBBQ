import initialState from "./initialState";
import * as type from "../actions/actionTypes";

export default function favoriteReducer(
  state = initialState.favorites,
  action
) {
  switch (action.type) {
    case type.CREATE_FAVORITE_SUCCESS:
      return { ...state, value: [...state.value, { ...action.favorite }] };
    case type.CREATE_FAVORITES_SUCCESS:
      return { ...state, value: [...action.favorites.value] };
    case type.DELETE_FAVORITE_SUCCESS:
      return {
        ...state,
        value: state.value.filter(
          favorite => favorite.Id !== action.favorite.Id
        )
      };
    case type.DELETE_USER_FAVORITE_SUCCESS:
      return {
        ...state,
        value: state.value.filter(favorite => favorite.Userid !== action.userID)
      };
    case type.UPDATE_FAVORITE_SUCCESS:
      return {
        ...state,
        value: state.value.map(favorite =>
          favorite.Id === action.favorite.Id ? action.favorite : favorite
        )
      };
    case type.LOAD_FAVORITE_SUCCESS:
      return action.favorites;
    default:
      return state;
  }
}
