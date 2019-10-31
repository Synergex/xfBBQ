import initialState from "./initialState";
import * as type from "../actions/actionTypes";

export default function bbqReducer(state = initialState.bbqs, action) {
  switch (action.type) {
    case type.CREATE_BBQ_SUCCESS:
      return [...state, { ...action.bbq }];
    case type.LOAD_BBQS_SUCCESS:
      return action.bbqs;
    default:
      return state;
  }
}
