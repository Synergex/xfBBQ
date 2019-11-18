import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://10.1.10.181:3001/Order/";

export async function getOrders() {
  try {
    let response = await fetch(baseUrl);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function saveOrder(order) {
  try {
    let response = await fetch(baseUrl + (order.id || ""), {
      method: order.id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(order)
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteOrder(orderID) {
  try {
    let response = await fetch(baseUrl + orderID, { method: "DELETE" });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
