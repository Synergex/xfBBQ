import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "https://localhost:8086/odata/v1/Orders";

export async function getOrders() {
  try {
    let response = await fetch(baseUrl);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getOrdersQuery(query) {
  try {
    let response = await fetch(baseUrl + "?" + query);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteOrder(orderID) {
  try {
    let response = await fetch(baseUrl + "/" + orderID, { method: "DELETE" });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function saveOrder(order) {
  try {
    let response = await fetch(baseUrl + "/" + (order.Id || ""), {
      method: order.Id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(order)
    });

    // Give the order back, if 204
    if (response.status === 204) {
      let blob = new Blob([JSON.stringify(order)], {
        "content-type": "application/json"
      });
      response = new Response(blob);
    }

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
