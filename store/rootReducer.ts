import { combineReducers } from "redux";
import auth from "../features/auth";

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
