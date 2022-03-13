import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Types } from "../redux/constants/types";
import { Auth } from "./Auth";
import Wait from "./Wait";

function Protected({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(-1);

  useEffect(() => {
    (async () => {
      const response = await Auth.getToken();
      if (response) {
        dispatch({ type: Types.VALID_USER, payload: response });
        setIsLoggedIn(1);
      } else setIsLoggedIn(0);
    })();
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
