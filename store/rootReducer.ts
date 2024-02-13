import { combineReducers } from "redux";
import auth from "../features/auth";
// import beans from "../features/beans";

const rootReducer = combineReducers({
  auth,
//   beans,
});

export default rootReducer;