import { combineReducers } from "redux";
import auth from "../features/auth";
import documents from "@/features/documents";

const rootReducer = combineReducers({
  auth,
  documents,
});

export default rootReducer;