import { handleResponse, handleError } from "./apiUtils";
import * as tokenApi from "./tokenApi";
const baseUrlPotluckItems = "https://localhost:8086/odata/v1/PotluckItems";
const baseUrlPotluckWishlist = "https://localhost:8086/odata/v1/PotluckWishlists";
const baseUrlPotluckFullfillment = "https://localhost:8086/odata/v1/PotluckFullfillments";

//top level items
export async function getItems() {
    try {
      let response = await fetch(baseUrlPotluckItems, {
        headers: { authorization: `Bearer ${tokenApi.authToken}` },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }
  
  export async function deleteItem(itemId) {
    try {
      let response = await fetch(`${baseUrlPotluckItems}/${itemId}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${tokenApi.authToken}` },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }
  
  export async function saveItem(item) {
    try {
      let response = await fetch(`${baseUrlPotluckItems}/${item.Id || ""}`, {
        method: item.Id ? "PUT" : "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenApi.authToken}`,
        },
        body: JSON.stringify(item),
      });
  
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }

//wishlist

  export async function getWishlistItems(bbqid) {
    try {
      let response = await fetch(baseUrlPotluckWishlist + '?$filter=bbqid eq ' + bbqid, {
        headers: { authorization: `Bearer ${tokenApi.authToken}` },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }
  
  export async function deleteWishlistItem(wishlistId) {
    try {
      let response = await fetch(`${baseUrlPotluckWishlist}/${wishlistId}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${tokenApi.authToken}` },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }
  
  export async function saveWishlistItem(item) {
    try {
      let response = await fetch(`${baseUrlPotluckWishlist}/${item.Id || ""}`, {
        method: item.Id ? "PUT" : "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenApi.authToken}`,
        },
        body: JSON.stringify(item),
      });
  
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }

  //fullfillments

  export async function getFullfillmentItems(bbqid) {
    try {
      let response = await fetch(baseUrlPotluckFullfillment + '?$filter=bbqid eq ' + bbqid, {
        headers: { authorization: `Bearer ${tokenApi.authToken}` },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }
  
  export async function deleteFullfillmentItem(fullfillmentId) {
    try {
      let response = await fetch(`${baseUrlPotluckFullfillment}/${fullfillmentId}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${tokenApi.authToken}` },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }
  
  export async function saveFullfillmentItem(item) {
    try {
      let response = await fetch(`${baseUrlPotluckFullfillment}/${item.Id || ""}`, {
        method: item.Id ? "PUT" : "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenApi.authToken}`,
        },
        body: JSON.stringify(item),
      });
  
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }