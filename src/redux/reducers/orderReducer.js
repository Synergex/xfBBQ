import initialState from "./initialState";
import * as type from "../actions/actionTypes";

export default function orderReducer(state = initialState.orders, action) {
  switch (action.type) {
    case type.CREATE_ORDER_SUCCESS:
      return [...state, { ...action.order }];
    case type.LOAD_ORDERS_SUCCESS:
      return action.orders;
    default:
      return state;
  }
}
