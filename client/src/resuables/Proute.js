import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Types } from "../redux/constants/types";
import Wait from "./Wait";
import baseApi from "../apis/baseApi";

function Protected({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(-1);

  useEffect(() => {
    baseApi
      .post("api/auth/refreshtoken", {})
      .then((res) => {
        dispatch({ type: Types.VALID_USER, payload: res.data });
        setIsLoggedIn(1);
      })
      .catch((err) => {
        setIsLoggedIn(0);
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoggedIn === -1)
    return (
      <div className="container">
        <Wait />
      </div>
    );

  if (isLoggedIn === 0) return <Redirect to="/" />;

  if (isLoggedIn === 1)
    return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default Protected;
