import { Types } from "../constants/types";

const INITIAL_STATE = {
  meals: [],
};

export const mealReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.SET_MEAL:
      return { ...state, meals: payload };

    case Types.FETCH_MEAL:
      return { ...state, meals: payload };

    default:
      return state;
  }
};

export const orderReducer = (state = [], { type, payload }) => {
  switch (type) {
    case Types.ADD_MEAL:
      return [
        ...state,
        {
          id: payload.id,
          name: payload.name,
          desc: payload.desc,
          type: payload.type,
          image: payload.image,
          price: payload.price,
          qty: payload.qty + 1,
          total:
            payload.qty === 0
              ? payload.price
              : payload.price * (payload.qty + 1),
        },
      ];
    case Types.REMOVE_MEAL:
      return [
        ...state,
        {
          id: payload.id,
          name: payload.name,
          desc: payload.desc,
          type: payload.type,
          image: payload.image,
          price: payload.qty >= 2 ? payload.price : 0,
          qty: payload.qty > 0 ? payload.qty - 1 : payload.qty,
          total: payload.qty === 0 ? 0 : payload.price * (payload.qty - 1),
        },
      ];
    default:
      return state;
  }
};

export const userReducer = (state = [], { type, payload }) => {
  switch (type) {
    case Types.VALID_USER:
      return { ...state, user: payload };

    default:
      return state;
  }
};
