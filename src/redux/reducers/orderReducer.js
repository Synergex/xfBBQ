import initialState from "./initialState";
import * as type from "../actions/actionTypes";

export default function orderReducer(state = initialState.orders, action) {
  switch (action.type) {
    case type.CREATE_ORDER_SUCCESS:
      return { ...state, value: [...state.value, { ...action.order }] };
    case type.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        value: state.value.filter(order => order.Id !== action.order.Id)
      };
    case type.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        value: state.value.map(order =>
          order.Id === action.order.Id ? action.order : order
        )
      };
    case type.LOAD_ORDERS_SUCCESS:
      return action.orders;
    default:
      return state;
  }
}
