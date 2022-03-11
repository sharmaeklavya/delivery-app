import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useStripe } from "@stripe/react-stripe-js";
import baseApi from "../apis/baseApi";

function Cart() {
  const stripe = useStripe();
  const history = useHistory();
  const [cartOrder, setCartOrder] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const orders = useSelector((state) => state.allOrders);
  const validUser = useSelector((state) => state.validateUser.user);

  function lastIndexOf(val1, val2) {
    let index = -1;
    for (let i = 0; i < val1.length; i++) {
      if (val1[i].id === val2.id) index = i;
    }
    return index;
  }

  useEffect(() => {
    const cart = orders
      .filter((v, i, a) => lastIndexOf(a, v) === i)
      .reverse()
      .filter((v) => v.qty > 0);
    const initialVal = 0;
    const total = cart.reduce(
      (preVal, curVal) => preVal + curVal.total,
      initialVal
    );
    setCartOrder(cart);
    setGrandTotal(total);
  }, [orders]);

  const handleRedirect = () => {
    history.push("/sign-in");
  };

  const handleCheckout = async () => {
    const line_items = cartOrder.map((order) => {
      return {
        quantity: order.qty,
        price_data: {
          currency: "INR",
          unit_amount: order.price * 100,
          product_data: {
            name: order.name,
            images: [`https://proj-delivery.netlify.app${order.image}`],
          },
        },
      };
    });
    const response = await baseApi.post("api/meals/checkout", { line_items });
    const { sessionId } = response.data;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    if (error) console.log(error);
  };

  return (
    <div className="card border my-3 position-md-fixed">
      {grandTotal > 1 ? (
        <>
          <div className="card-body cart-body" style={{ overflowY: "auto" }}>
            <div className="row">
              <div className="col-sm-5 col-md-6 col-lg-5 px-1">
                <h5 className="meal-subtitle text-left">Meal</h5>
                <hr />
              </div>
              <div className="col-sm-2 col-md-6 col-lg-2 px-1">
                <h5 className="meal-subtitle text-right">Px</h5>
                <hr />
              </div>
              <div className="col-sm-2 col-md-6 col-lg-2 px-1">
                <h5 className="meal-subtitle text-right">Qty</h5>
                <hr />
              </div>
              <div className="col-sm-3 col-md-6 col-lg-3 px-1">
                <h5 className="meal-subtitle text-right">Total</h5>
                <hr />
              </div>
            </div>
            {cartOrder.map((order, i) => (
              <div key={i} className="row">
                <div className="col col-sm-5 col-md-6 col-lg-5 px-1">
                  <p className="cart-text left">{order.name}</p>
                </div>
                <div className="col col-sm-2 col-md-6 col-lg-2 px-1">
                  <p className="cart-text text-right">{order.price}</p>
                </div>
                <div className="col col-sm-2 col-md-6 col-lg-2 px-1 ">
                  <p className="cart-text text-right">{order.qty}</p>
                </div>
                <div className="col col-sm-3 col-md-6 col-lg-3 px-1">
                  <p className="cart-text text-right">{order.total}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="card-body py-2 shadow">
            <div className="row">
              <div className="col col-sm-8 px-1">
                <h5 className="meal-subtitle text-right">Sub Total:</h5>
              </div>
              <div className="col col-sm-4 px-1">
                <p className="meal-subtitle text-right">INR {grandTotal}</p>
              </div>
              <div className="col-sm-12 px-1 text-right">
                <button
                  onClick={validUser ? handleCheckout : handleRedirect}
                  className="magenta-btn w-100"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="card-body cart-body">
          <div className="row">
            <div className="col-sm-8 col-md-10 col-lg-12 px-1">
              <h5 className="meal-subtitle text-center">
                Let's add some food here.
              </h5>
              <img
                src="/imgs/shopping.svg"
                alt="shopping-bag"
                className="ml-auto mt-5"
                style={{ width: "30%" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
