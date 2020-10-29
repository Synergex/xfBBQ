import { handleResponse, handleError } from "./apiUtils";
import * as tokenApi from "./tokenApi";
const baseUrlPotluckItems = "https://localhost:8086/odata/v1/PotluckItems";
const baseUrlPotluckWishlist = "https://localhost:8086/odata/v1/PotluckWishlists";
const baseUrlPotluckFulfillment = "https://localhost:8086/odata/v1/PotluckFulfillments";

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

//make endpoint for unfufilled items
  export async function getUnfulfilledItems(bbqid) {
    try {
        let wishlist = await getWishlistItems(bbqid);
        let fulfilled = await getFulfillmentItems(bbqid);

        //iterate fulfilled items and subtract the amount fulfilled from the corisponding wishlist item
        for(const fulfilledItem of fulfilled) {
            const itemid = fulfilledItem.Itemid;
            const foundWishlistItem = wishlist.find(wishItem => wishItem.itemid === itemid);
            foundWishlistItem.Qty -= fulfilledItem.Qty;
        }

        let result = wishlist.filter(item => item.Qty > 0);
        return handleResponse(result);
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

  //Fulfillments

  export async function getFulfillmentItems(bbqid) {
    try {
      let response = await fetch(baseUrlPotluckFulfillment + '?$filter=bbqid eq ' + bbqid, {
        headers: { authorization: `Bearer ${tokenApi.authToken}` },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }
  
  export async function deleteFulfillmentItem(FulfillmentId) {
    try {
      let response = await fetch(`${baseUrlPotluckFulfillment}/${FulfillmentId}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${tokenApi.authToken}` },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }
  
  export async function saveFulfillmentItem(item) {
    try {
      let response = await fetch(`${baseUrlPotluckFulfillment}/${item.Id || ""}`, {
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

  //create custom wishlist item for my unasked for potluck item
  export async function saveCustomFulfillmentItem(itemDescription, itemQuantity, bbqid, userid) {
    try {
      let customItem = { Description: itemDescription, Icon: "customitem.png" };
      let madeItem = saveItem(customItem);
      let customWishlist = { Bbqid: bbqid, Itemid: madeItem.Id, Qty: itemQuantity };
      let madeWishlistItem = await saveWishlistItem(customWishlist);
      let customFulfillment = { Bbqid: bbqid, Itemid: madeItem.Id, Qty: itemQuantity, Userid: userid };
      let madeFulfillment = await saveFulfillmentItem(customFulfillment);
      return handleResponse(madeFulfillment);
    } catch (error) {
      return handleError(error);
    }
  }