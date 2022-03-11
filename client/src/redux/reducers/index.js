import { combineReducers } from "redux";
import { mealReducer, orderReducer, userReducer } from "./reducer";

const reducers = combineReducers({
  allMeals: mealReducer,
  allOrders: orderReducer,
  validUsers: userReducer,
});

export default reducers;
