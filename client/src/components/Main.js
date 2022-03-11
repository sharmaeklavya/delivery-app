import React from "react";
import Cart from "./Cart";
import Counter from "../resuables/Counter";

const Main = (props) => {
  return (
    <main className="px-3 py-2">
      <div className="d-flex justify-content-between">
        <hr className="straight-line" />
        <h5 className="section-title text-right">Yummy Yummy Pizzas</h5>
      </div>
      <div className="row mt-3">
        <div className="col-md-8">
          <div className="row">
            {props.meals
              .filter((m) => m.mealType === "pizza")
              .map((m, index) => (
                <div key={index} className="col-lg-4 col-sm-6">
                  <div className="card meal my-3">
                    <img
                      src={m.mealImg}
                      className="meal-img"
                      alt={m.mealName}
                    />
                    <div className="card-body">
                      <h5 className="meal-title" style={{ height: "40px" }}>
                        {m.mealName}
                      </h5>
                      <p className="meal-text">{m.mealDesc}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="meal-text">
                          Rs. <span>{m.mealPrice}</span>
                        </p>
                        <div className="cta">
                          <Counter
                            id={m._id}
                            name={m.mealName}
                            desc={m.mealDesc}
                            type={m.mealType}
                            image={m.mealImg}
                            price={m.mealPrice}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="col-md-4 order-first order-md-last">
          <Cart />
        </div>
      </div>
    </main>
  );
};

export default Main;
