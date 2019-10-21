import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function orderReducer(state = initialState.orders, action) {
  switch (action.types) {
    case types.LOAD_ORDERS_SUCCESS:
      return action.orders;
    default:
      return state;
  }
}
