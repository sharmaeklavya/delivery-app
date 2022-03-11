import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeals } from "../redux/actions/mealActions";
import Wait from "../resuables/Wait";
import Header from "./Header";
import Karousel from "./Karousel";
import Main from "./Main";
import Footer from "./Footer";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const meals = useSelector((state) => state.allMeals.meals);

  useEffect(() => {
    dispatch(fetchMeals());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (meals.length > 2) setLoading(true);
  }, [meals]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Header />
        </div>
      </div>
      {loading ? (
        <div className="row">
          <div className="col-md-12">
            <Karousel meals={meals} />
          </div>
          <div className="col-md-12">
            <Main meals={meals} />
          </div>
          <div className="col-md-12">
            <Footer />
          </div>
        </div>
      ) : (
        <Wait />
      )}
    </div>
  );
};

export default Home;
