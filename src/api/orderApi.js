import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://10.1.10.181:3001/Order/";

export function getOrders() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
