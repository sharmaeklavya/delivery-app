import { combineReducers } from "redux";
import { mealReducer, orderReducer, validateReducer } from "./reducer";

const reducers = combineReducers({
  allMeals: mealReducer,
  allOrders: orderReducer,
  validateUser: validateReducer,
});

export default reducers;
