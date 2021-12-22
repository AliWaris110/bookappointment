import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import ThemeReducer from "./themereducer";

export default combineReducers({
  auth,
  message,
  ThemeReducer,
});