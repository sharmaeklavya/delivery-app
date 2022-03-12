import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import baseApi from "./apis/baseApi";
import Protected from "./resuables/Proute";
import Account from "./components/Account";
import Success from "./components/Success";
import Cancelled from "./components/Cancelled";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Orders from "./components/Orders";

function App() {
  const [userLoggedIn, setLoggedIn] = useState(false);

  const handleLogIn = () => {
    const res = baseApi
      .post("api/auth/refreshtoken", {})
      .then((res) => {
        if (res.data.refreshToken) setLoggedIn(true);
      })
      .catch((err) => {
        setLoggedIn(false);
        console.error(err.response.data);
      });
    if (!res) setLoggedIn(false);
  };

  useEffect(() => {
    handleLogIn();
  }, [userLoggedIn]);

  return (
    <Router>
      <Switch>
        <Protected path="/my-account" component={Account} exact />
        <Protected path="/my-orders" component={Orders} exact />
        <Protected path="/success" component={Success} />
        <Protected path="cancelled" component={Cancelled} exact />
        <Route path="/sign-up" component={Signup} exact />
        <Route path="/sign-in" exact>
          {userLoggedIn ? <Redirect to="/my-account" /> : <Signin />}
        </Route>
        <Route path="/" exact>
          {userLoggedIn ? <Redirect to="/my-account" /> : <Home />}
        </Route>
        <Route path="*">
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="text-center">
              <p className="lead"> 404 Page not found</p>
              <button className="btn">
                <Link to="/">Take me back</Link>
              </button>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
