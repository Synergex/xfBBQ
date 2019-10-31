import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://10.1.10.181:3001/User/";

export async function getUsers() {
  try {
    let response = await fetch(baseUrl);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function saveUser(user) {
  try {
    let response = await fetch(baseUrl + (user.id || ""), {
      method: user.id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user)
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
