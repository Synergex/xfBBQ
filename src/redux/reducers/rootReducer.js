import { combineReducers } from "redux";

import bbqs from "./bbqReducer";
import orders from "./orderReducer";
import users from "./userReducer";

export default function rootReducer() {
  return combineReducers({
    bbqs,
    orders,
    users
  });
}
