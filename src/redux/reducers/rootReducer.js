import { combineReducers } from "redux";
import orders from "./orderReducer";
import users from "./userReducer";

const rootReducer = combineReducers({
  orders,
  users
});

export default rootReducer;
