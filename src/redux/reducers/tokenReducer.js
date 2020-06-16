import initialState from "./initialState";
import * as type from "../actions/actionTypes";
import moment from "moment";

export default function tokenReducer(state = initialState.token, action) {
  switch (action.type) {
    case type.GET_TOKEN_SUCCESS:
      return { ...action.token, loadedAt: moment() };
    case type.REMOVE_TOKEN_SUCCESS:
      return {};
    default:
      return state;
  }
}
