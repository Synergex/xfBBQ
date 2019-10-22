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
