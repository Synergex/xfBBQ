import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "https://localhost:8086/odata/v1/Users/";

export async function getUsers() {
  try {
    let response = await fetch(baseUrl);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteUser(userID) {
  try {
    let response = await fetch(baseUrl + userID, { method: "DELETE" });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function saveUser(user) {
  try {
    let response = await fetch(baseUrl + (user.Id || ""), {
      method: user.Id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user)
    });

    // Give the user back, if 204
    if (response.status === 204) {
      let blob = new Blob([JSON.stringify(user)], {
        "content-type": "application/json"
      });
      response = new Response(blob);
    }

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
