import * as type from "./actionTypes";
import * as bbqApi from "../../api/bbqApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function createBBQSuccess(bbq) {
  return { type: type.CREATE_BBQ_SUCCESS, bbq };
}

export function loadBBQsSuccess(bbqs) {
  return { type: type.LOAD_BBQS_SUCCESS, bbqs };
}

export function loadBBQs() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const bbqs = await bbqApi.getBBQs();
      dispatch(loadBBQsSuccess(bbqs));
    } catch (e) {
      dispatch(apiCallError(e));
      throw e;
    }
  };
}

export function saveBBQ(bbq) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const savedBBQ = await bbqApi.saveBBQ(bbq);
      dispatch(createBBQSuccess(savedBBQ));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}
