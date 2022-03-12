import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMeals, removeMeals } from "../redux/actions/mealActions";

function Counter(props) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const addToCart = () => {
    setCount(count + 1);
    dispatch(
      addMeals({
        id: props.id,
        name: props.name,
        desc: props.desc,
        type: props.type,
        image: props.image,
        price: props.price,
        qty: count,
      })
    );
  };

  const removeFromCart = () => {
    if (count >= 1) {
      setCount(count - 1);
      dispatch(
        removeMeals({
          id: props.id,
          name: props.name,
          desc: props.desc,
          type: props.type,
          image: props.image,
          price: props.price,
          qty: count,
        })
      );
    }
  };

  return (
    <>
      <button
        type="button"
        className="cta-btn add-btn text-center"
        onClick={addToCart}
      >
        +
      </button>
      <span className="meal-text m-1">{count}</span>
      <button
        type="button"
        className="cta-btn remove-btn text-center"
        onClick={removeFromCart}
      >
        -
      </button>
    </>
  );
}

export default Counter;
