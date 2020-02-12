import { combineReducers } from "redux";

import login from "./loginReducer";
import bbqs from "./bbqReducer";
import orders from "./orderReducer";
import users from "./userReducer";
import favorites from "./favoriteReducer";

export default function rootReducer() {
  return combineReducers({
    login,
    bbqs,
    orders,
    users,
    favorites
  });
}
