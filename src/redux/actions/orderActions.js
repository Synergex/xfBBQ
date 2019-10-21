import * as types from "./actionTypes";
import * as orderApi from "../../api/orderApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadOrdersSuccess(orders) {
  return { type: types.LOAD_ORDERS_SUCCESS, orders };
}

export function loadOrders() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const orders = await orderApi.getOrders();
      dispatch(loadOrdersSuccess(orders));
    } catch (e) {
      dispatch(apiCallError(e));
      throw e;
    }
  };
}
