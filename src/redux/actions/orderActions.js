import * as type from "./actionTypes";
import * as orderApi from "../../api/orderApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { toast } from "react-toastify";

export function createOrderSuccess(order) {
  toast.success("Created order " + order.id);
  return { type: type.CREATE_ORDER_SUCCESS, order };
}

export function deleteOrderSuccess(order) {
  toast.success("Deleted order " + order.id);
  return { type: type.DELETE_ORDER_SUCCESS, order };
}

export function loadOrdersSuccess(orders) {
  return { type: type.LOAD_ORDERS_SUCCESS, orders };
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

export function saveOrder(order) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const savedOrder = await orderApi.saveOrder(order);
      dispatch(createOrderSuccess(savedOrder));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function deleteOrder(order) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      await orderApi.deleteOrder(order.id);
      dispatch(deleteOrderSuccess(order));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}
