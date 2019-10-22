import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://10.1.10.181:3001/BBQ/";

export async function getBBQs() {
  try {
    let response = await fetch(baseUrl);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
