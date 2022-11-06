import { createStore } from "redux";
import salesData from "./data.json";

const initailState = {
  data: salesData
};
const rootReducer = (state = initailState) => {
  return state;
};

export default createStore(rootReducer);
