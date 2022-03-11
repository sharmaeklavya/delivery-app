import baseApi from "../../apis/baseApi";
import { Types } from "../constants/types";

export const fetchMeals = () => {
  return async (dispatch) => {
    const pizzas = await baseApi.get("api/meals/pizza");
    const toppings = await baseApi.get("api/meals/topping");
    const beverages = await baseApi.get("api/meals/beverage");

    const meals = [...pizzas.data, ...toppings.data, ...beverages.data];
    dispatch({
      type: Types.FETCH_MEAL,
      payload: meals,
    });
  };
};

export const setMeals = (meals) => {
  return {
    type: Types.SET_MEAL,
    payload: meals,
  };
};

export const addMeals = (meals) => {
  return {
    type: Types.ADD_MEAL,
    payload: meals,
  };
};

export const removeMeals = (meals) => {
  return {
    type: Types.REMOVE_MEAL,
    payload: meals,
  };
};

export const validateUser = (user) => {
  return {
    type: Types.VALID_USER,
    payload: user,
  };
};
