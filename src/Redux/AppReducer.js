import ThemeReducer from "./ThemeReducer";
import { combineReducers } from "redux";

const AppReducer = combineReducers({
  theme: ThemeReducer,
});

export default AppReducer;
