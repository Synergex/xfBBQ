import * as type from "./actionTypes";
import * as bbqAPI from "../../api/bbqAPI";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadBBQsSuccess(bbqs) {
  return { type: type.LOAD_BBQS_SUCCESS, bbqs };
}

export function loadBBQs() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const bbqs = await bbqAPI.getBBQs();
      dispatch(loadBBQsSuccess(bbqs));
    } catch (e) {
      dispatch(apiCallError(e));
      throw e;
    }
  };
}
