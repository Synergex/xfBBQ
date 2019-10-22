import { combineReducers } from "redux";
import orders from "./orderReducer";
import users from "./userReducer";

export default function rootReducer() {
  return combineReducers({
    orders,
    users
  });
}
