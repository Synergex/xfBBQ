import { handleResponse, handleError } from "../api/apiUtils";
import * as tokenApi from "./tokenApi";
const baseUrl = "https://localhost:8086/odata/v1/";

/**
 * Returns the result of an OData query
 * @param {String} query - The query string to process
 */
export default async function getQuery(query) {
  try {
    let response = await fetch(baseUrl + query, {
      headers: { authorization: `Bearer ${tokenApi.authToken}` },
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
