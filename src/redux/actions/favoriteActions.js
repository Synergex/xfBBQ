import * as type from "./actionTypes";
import * as favoriteApi from "../../api/favoriteApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { toast } from "react-toastify";

export function createFavoriteSuccess(favorite) {
  toast.success("Created favorite " + favorite.Id);
  return { type: type.CREATE_FAVORITE_SUCCESS, favorite };
}

export function deleteFavoriteSuccess(favorite) {
  toast.success("Deleted favorite " + favorite.Id);
  return { type: type.DELETE_FAVORITE_SUCCESS, favorite };
}

export function loadFavoritesSuccess(favorites) {
  return { type: type.LOAD_FAVORITE_SUCCESS, favorites };
}

export function updateFavoriteSuccess(favorite) {
  toast.success("Updated favorite " + favorite.Id);
  return { type: type.UPDATE_FAVORITE_SUCCESS, favorite };
}

export function loadFavorites() {
  return async dispatch => {
    dispatch(beginApiCall());
    try {
      const favorites = await favoriteApi.getFavorites();
      dispatch(loadFavoritesSuccess(favorites));
    } catch (e) {
      dispatch(apiCallError(e));
      throw e;
    }
  };
}

export function saveFavorite(favorite) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const savedFavorite = await favoriteApi.saveFavorite(favorite);
      favorite.Id
        ? dispatch(updateFavoriteSuccess(savedFavorite))
        : dispatch(createFavoriteSuccess(savedFavorite));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function deleteFavorite(favorite) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      await favoriteApi.deleteFavorite(favorite.Id);
      dispatch(deleteFavoriteSuccess(favorite));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}
