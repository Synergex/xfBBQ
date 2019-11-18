import initialState from "./initialState";
import * as type from "../actions/actionTypes";

export default function bbqReducer(state = initialState.bbqs, action) {
  switch (action.type) {
    case type.CREATE_BBQ_SUCCESS:
      return [...state, { ...action.bbq }];
    case type.DELETE_BBQ_SUCCESS:
      return state.filter(bbq => bbq.id !== action.bbq.id);
    case type.LOAD_BBQS_SUCCESS:
      return action.bbqs;
    case type.UPDATE_BBQ_SUCCESS:
      return state.map(bbq => (bbq.id === action.bbq.id ? action.bbq : bbq));
    default:
      return state;
  }
}
