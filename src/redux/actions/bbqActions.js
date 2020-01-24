import * as type from "./actionTypes";
import * as bbqApi from "../../api/bbqApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { toast } from "react-toastify";

export function createBBQSuccess(bbq) {
  toast.success("Created BBQ " + bbq.Id);
  return { type: type.CREATE_BBQ_SUCCESS, bbq };
}

export function deleteBBQSuccess(bbq) {
  toast.success("Deleted BBQ " + bbq.Id);
  return { type: type.DELETE_BBQ_SUCCESS, bbq };
}

export function loadBBQsSuccess(bbqs) {
  return { type: type.LOAD_BBQS_SUCCESS, bbqs };
}

export function updateBBQSuccess(bbq) {
  toast.success("Updated BBQ " + bbq.Id);
  return { type: type.UPDATE_BBQ_SUCCESS, bbq };
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
      bbq.Id
        ? dispatch(updateBBQSuccess(savedBBQ))
        : dispatch(createBBQSuccess(savedBBQ));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function deleteBBQ(bbq) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      await bbqApi.deleteBBQ(bbq.Id);
      dispatch(deleteBBQSuccess(bbq));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}
