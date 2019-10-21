import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://10.1.10.181:3001/User/";

export function getUsers() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
