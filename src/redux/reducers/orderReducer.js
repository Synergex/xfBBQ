import initialState from "./initialState";
import * as type from "../actions/actionTypes";

export default function orderReducer(state = initialState.orders, action) {
  switch (action.type) {
    case type.CREATE_ORDER_SUCCESS:
      return [...state, { ...action.order }];
    case type.DELETE_ORDER_SUCCESS:
      return state.filter(order => order.id !== action.order.id);
    case type.LOAD_ORDERS_SUCCESS:
      return action.orders;
    default:
      return state;
  }
}
