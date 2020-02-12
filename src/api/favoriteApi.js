import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "https://localhost:8086/odata/v1/Favorites/";

export async function getFavorites() {
  try {
    let response = await fetch(baseUrl);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteFavorite(favoriteID) {
  try {
    let response = await fetch(baseUrl + favoriteID, { method: "DELETE" });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function saveFavorite(favorite) {
  try {
    let response = await fetch(baseUrl + (favorite.Id || ""), {
      method: favorite.Id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(favorite)
    });

    // Give the order back, if 204
    if (response.status === 204) {
      let blob = new Blob([JSON.stringify(favorite)], {
        "content-type": "application/json"
      });
      response = new Response(blob);
    }

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
