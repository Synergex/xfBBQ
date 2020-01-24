import initialState from "./initialState";
import * as type from "../actions/actionTypes";

export default function bbqReducer(state = initialState.bbqs, action) {
  switch (action.type) {
    case type.CREATE_BBQ_SUCCESS:
      return { ...state, value: [...state.value, { ...action.bbq }] };
    case type.DELETE_BBQ_SUCCESS:
      return {
        ...state,
        value: state.value.filter(bbq => bbq.Id !== action.bbq.Id)
      };
    case type.UPDATE_BBQ_SUCCESS:
      return {
        ...state,
        value: state.value.map(bbq =>
          bbq.Id === action.bbq.Id ? action.bbq : bbq
        )
      };
    case type.LOAD_BBQS_SUCCESS:
      return action.bbqs;
    default:
      return state;
  }
}
