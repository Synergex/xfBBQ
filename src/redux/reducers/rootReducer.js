import { combineReducers } from "redux";
import orders from "./orderReducer";

const rootReducer = combineReducers({
  orders
});

export default rootReducer;
